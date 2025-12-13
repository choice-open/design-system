import { useRef, useMemo, useEffect } from "react"

export interface PooledItem<P> {
  index: number
  item: P
  key: string
  poolId: number
}

export interface ItemPoolOptions {
  maxPoolSize?: number
  poolSize?: number
}

export function useItemPool<P>(
  visibleItems: Array<{ item: P; key: string }>,
  options: ItemPoolOptions = {},
) {
  const { poolSize = 50, maxPoolSize = 200 } = options

  // Pool storage - stable refs that persist across renders
  const poolRef = useRef<Map<number, PooledItem<P>>>(new Map())
  const keyToPoolIdRef = useRef<Map<string, number>>(new Map())
  const nextPoolIdRef = useRef(0)

  // Generate pooled items synchronously
  const pooledItems = useMemo(() => {
    const visibleKeys = new Set(visibleItems.map((v) => v.key))

    return visibleItems.map((visibleItem, index) => {
      const { key, item } = visibleItem
      const existingPoolId = keyToPoolIdRef.current.get(key)

      // Reuse existing pool slot if available
      if (existingPoolId !== undefined) {
        const pooledItem = poolRef.current.get(existingPoolId)
        if (pooledItem) {
          pooledItem.item = item
          pooledItem.index = index
          return pooledItem
        }
      }

      // Find an unused pool slot
      let poolId: number | undefined
      const usedPoolIds = new Set(keyToPoolIdRef.current.values())

      // First try to find a reusable slot
      for (let i = 0; i < nextPoolIdRef.current && i < maxPoolSize; i++) {
        if (!usedPoolIds.has(i)) {
          poolId = i
          break
        }
      }

      // If no reusable slot, create new one
      if (poolId === undefined && nextPoolIdRef.current < maxPoolSize) {
        poolId = nextPoolIdRef.current++
      }

      // If pool is full, evict an item not in visible set
      if (poolId === undefined) {
        for (const [k, pid] of keyToPoolIdRef.current.entries()) {
          if (!visibleKeys.has(k)) {
            keyToPoolIdRef.current.delete(k)
            poolId = pid
            break
          }
        }
      }

      // Ultimate fallback
      if (poolId === undefined) {
        poolId = 0
      }

      const pooledItem: PooledItem<P> = { key, item, index, poolId }
      poolRef.current.set(poolId, pooledItem)
      keyToPoolIdRef.current.set(key, poolId)

      return pooledItem
    })
  }, [visibleItems, maxPoolSize])

  // Cleanup in useEffect instead of setTimeout in useMemo
  useEffect(() => {
    const visibleKeys = new Set(visibleItems.map((v) => v.key))
    const keysToRemove: string[] = []

    for (const [key, poolId] of keyToPoolIdRef.current.entries()) {
      if (!visibleKeys.has(key)) {
        keysToRemove.push(key)
        // Only delete from pool if exceeding poolSize
        if (poolRef.current.size > poolSize) {
          poolRef.current.delete(poolId)
        }
      }
    }

    keysToRemove.forEach((key) => keyToPoolIdRef.current.delete(key))
  }, [visibleItems, poolSize])

  return pooledItems
}
