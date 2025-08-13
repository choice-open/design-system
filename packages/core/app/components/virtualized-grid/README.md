# VirtualizedGrid Component

A high-performance virtualized grid component for efficiently rendering large datasets with smooth scrolling and minimal memory usage. Perfect for photo galleries, product catalogs, data tables, and any scenario requiring the display of thousands of items.

## Overview

VirtualizedGrid uses virtualization techniques to only render visible items plus a small overscan buffer, enabling smooth scrolling performance even with datasets containing 100,000+ items. It features responsive column layouts, variable row heights, and intelligent DOM node pooling.

## Key Features

- **High Performance**: O(log n) rendering using binary search optimization
- **Memory Efficient**: Only renders visible items + overscan buffer
- **Responsive**: Dynamic column count based on container width
- **Flexible Layouts**: Supports both grid and list modes
- **Variable Heights**: Automatic height calculation for dynamic content
- **Smooth Scrolling**: Configurable overscan for seamless user experience
- **Error Boundaries**: Built-in error handling for edge cases

## Usage

### Basic Grid

```tsx
import { VirtualizedGrid } from "~/components/virtualized-grid"

interface Item {
  id: string
  title: string
  image: string
}

const items: Item[] = Array.from({ length: 10000 }, (_, index) => ({
  id: `item-${index}`,
  title: `Item ${index + 1}`,
  image: `https://picsum.photos/200/150?random=${index}`
}))

export function BasicExample() {
  return (
    <div className="h-96 border rounded">
      <VirtualizedGrid
        items={items}
        itemHeight={200}
        columnWidth={180}
        gap={16}
        renderItem={({ item, index }) => (
          <div className="bg-white border rounded p-4">
            <img 
              src={item.image} 
              alt={item.title}
              className="w-full h-32 object-cover rounded mb-2"
            />
            <h3 className="font-medium truncate">{item.title}</h3>
            <p className="text-sm text-gray-600">#{index + 1}</p>
          </div>
        )}
      />
    </div>
  )
}
```

### Photo Gallery

```tsx
export function PhotoGalleryExample() {
  const photos = Array.from({ length: 5000 }, (_, index) => ({
    id: `photo-${index}`,
    url: `https://picsum.photos/300/200?random=${index}`,
    title: `Photo ${index + 1}`,
    author: `Photographer ${Math.floor(index / 10) + 1}`
  }))
  
  return (
    <div className="h-screen">
      <VirtualizedGrid
        items={photos}
        itemHeight={250}
        columnWidth={220}
        gap={12}
        overscan={5}
        renderItem={({ item }) => (
          <div className="bg-white border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <img 
              src={item.url}
              alt={item.title}
              className="w-full h-40 object-cover"
            />
            <div className="p-3">
              <h3 className="font-medium text-sm mb-1">{item.title}</h3>
              <p className="text-xs text-gray-600">by {item.author}</p>
            </div>
          </div>
        )}
      />
    </div>
  )
}
```

### Product Catalog

```tsx
export function ProductCatalogExample() {
  const products = Array.from({ length: 20000 }, (_, index) => ({
    id: `product-${index}`,
    name: faker.commerce.productName(),
    price: parseFloat(faker.commerce.price()),
    image: `https://picsum.photos/200/150?random=${index}`,
    category: faker.commerce.department(),
    inStock: Math.random() > 0.2
  }))
  
  return (
    <div className="h-screen">
      <VirtualizedGrid
        items={products}
        itemHeight={280}
        columnWidth={200}
        gap={16}
        renderItem={({ item, index }) => (
          <div className="bg-white border rounded-lg overflow-hidden">
            <div className="relative">
              <img 
                src={item.image}
                alt={item.name}
                className="w-full h-36 object-cover"
              />
              {!item.inStock && (
                <div className="absolute inset-0 bg-gray-900/50 flex items-center justify-center">
                  <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">
                    Out of Stock
                  </span>
                </div>
              )}
            </div>
            <div className="p-3">
              <h3 className="font-medium text-sm mb-2 line-clamp-2">
                {item.name}
              </h3>
              <p className="text-xs text-gray-600 mb-2">{item.category}</p>
              <div className="flex justify-between items-center">
                <span className="font-bold text-green-600">
                  ${item.price.toFixed(2)}
                </span>
                <button 
                  disabled={!item.inStock}
                  className="bg-blue-500 disabled:bg-gray-300 text-white text-xs px-2 py-1 rounded"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        )}
      />
    </div>
  )
}
```

## Props

### VirtualizedGrid Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | `T[]` | - | **Required.** Array of items to render |
| `renderItem` | `(props: RenderItemProps<T>) => ReactNode` | - | **Required.** Function to render each item |
| `itemHeight` | `number \| ((item: T, index: number) => number)` | - | **Required.** Height of each item (fixed or dynamic) |
| `columnWidth` | `number` | `200` | Width of each column in pixels |
| `gap` | `number` | `8` | Gap between items in pixels |
| `overscan` | `number` | `3` | Number of extra items to render outside viewport |
| `className` | `string` | - | Additional CSS classes |
| `scrollElement` | `HTMLElement` | - | Custom scroll container (defaults to parent) |
| `onScroll` | `function` | - | Callback when scroll position changes |
| `getItemKey` | `(item: T, index: number) => string` | - | Custom key function for items |
| `estimatedItemHeight` | `number` | `itemHeight` | Estimated height for dynamic sizing |

### RenderItemProps

```tsx
interface RenderItemProps<T> {
  item: T              // The data item
  index: number        // Item index in the array
  isVisible: boolean   // Whether item is currently visible
}
```

## Advanced Examples

### Variable Height Items

```tsx
export function VariableHeightExample() {
  const items = Array.from({ length: 1000 }, (_, index) => ({
    id: `item-${index}`,
    title: faker.lorem.sentence(),
    description: faker.lorem.paragraphs(Math.floor(Math.random() * 3) + 1),
    type: ['short', 'medium', 'long'][Math.floor(Math.random() * 3)]
  }))
  
  const getItemHeight = (item: typeof items[0]) => {
    switch (item.type) {
      case 'short': return 120
      case 'medium': return 200
      case 'long': return 300
      default: return 160
    }
  }
  
  return (
    <div className="h-96 border rounded">
      <VirtualizedGrid
        items={items}
        itemHeight={getItemHeight}
        columnWidth={250}
        gap={12}
        renderItem={({ item }) => (
          <div 
            className={`bg-white border rounded p-4 ${
              item.type === 'long' ? 'bg-blue-50' : 
              item.type === 'medium' ? 'bg-green-50' : 'bg-gray-50'
            }`}
            style={{ height: getItemHeight(item) - 12 }} // Account for gap
          >
            <h3 className="font-bold mb-2">{item.title}</h3>
            <p className="text-sm text-gray-700 overflow-hidden">
              {item.description}
            </p>
          </div>
        )}
      />
    </div>
  )
}
```

### Searchable Grid

```tsx
export function SearchableGridExample() {
  const [searchQuery, setSearchQuery] = useState("")
  
  const allItems = useMemo(() => 
    Array.from({ length: 10000 }, (_, index) => ({
      id: `item-${index}`,
      name: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      price: faker.commerce.price(),
      category: faker.commerce.department()
    })), []
  )
  
  const filteredItems = useMemo(() =>
    allItems.filter(item =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase())
    ), [allItems, searchQuery]
  )
  
  return (
    <div className="h-screen">
      <div className="p-4 border-b">
        <Input
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search products..."
          className="max-w-md"
        />
        <p className="text-sm text-gray-600 mt-2">
          Showing {filteredItems.length} of {allItems.length} items
        </p>
      </div>
      
      <div className="h-full">
        <VirtualizedGrid
          key={searchQuery} // Force re-render on search
          items={filteredItems}
          itemHeight={180}
          columnWidth={200}
          gap={12}
          renderItem={({ item }) => (
            <div className="bg-white border rounded p-3">
              <h3 className="font-medium text-sm mb-1">{item.name}</h3>
              <p className="text-xs text-gray-600 mb-2">{item.category}</p>
              <p className="text-xs text-gray-800 mb-2 line-clamp-2">
                {item.description}
              </p>
              <div className="font-bold text-green-600">${item.price}</div>
            </div>
          )}
        />
      </div>
    </div>
  )
}
```

### List Mode

```tsx
export function ListModeExample() {
  const items = Array.from({ length: 50000 }, (_, index) => ({
    id: `user-${index}`,
    name: faker.person.fullName(),
    email: faker.internet.email(),
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${index}`,
    role: faker.person.jobTitle(),
    status: Math.random() > 0.3 ? 'active' : 'inactive'
  }))
  
  return (
    <div className="h-96 border rounded">
      <VirtualizedGrid
        items={items}
        itemHeight={72}
        columnWidth="100%" // Full width for list mode
        gap={1}
        renderItem={({ item, index }) => (
          <div className="bg-white border-b p-4 flex items-center gap-3 hover:bg-gray-50">
            <img 
              src={item.avatar}
              alt={item.name}
              className="w-10 h-10 rounded-full"
            />
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-sm truncate">{item.name}</h3>
              <p className="text-xs text-gray-600 truncate">{item.email}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-800">{item.role}</p>
              <Badge 
                variant={item.status === 'active' ? 'success' : 'secondary'}
                size="sm"
              >
                {item.status}
              </Badge>
            </div>
          </div>
        )}
      />
    </div>
  )
}
```

### Infinite Scrolling Integration

```tsx
export function InfiniteScrollExample() {
  const [items, setItems] = useState(() => generateItems(100))
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  
  const loadMore = useCallback(async () => {
    if (loading || !hasMore) return
    
    setLoading(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    const newItems = generateItems(50)
    setItems(prev => [...prev, ...newItems])
    
    if (items.length >= 5000) {
      setHasMore(false)
    }
    
    setLoading(false)
  }, [loading, hasMore, items.length])
  
  const handleScroll = useCallback((scrollTop: number, scrollHeight: number, clientHeight: number) => {
    // Load more when near bottom
    if (scrollHeight - scrollTop - clientHeight < 1000) {
      loadMore()
    }
  }, [loadMore])
  
  return (
    <div className="h-screen">
      <VirtualizedGrid
        items={items}
        itemHeight={200}
        columnWidth={180}
        gap={16}
        onScroll={handleScroll}
        renderItem={({ item, index }) => (
          <div className="bg-white border rounded p-4">
            <div className="w-full h-32 bg-gray-200 rounded mb-2" />
            <h3 className="font-medium">{item.title}</h3>
            <p className="text-sm text-gray-600">Item {index + 1}</p>
          </div>
        )}
      />
      
      {loading && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
          <div className="bg-black/75 text-white px-4 py-2 rounded">
            Loading more items...
          </div>
        </div>
      )}
    </div>
  )
}
```

## Performance Optimization

### Memory Management
- Only renders visible items plus overscan buffer
- Automatic DOM node recycling for better memory usage
- Efficient scroll event handling with requestAnimationFrame

### Optimization Tips
1. **Use stable keys**: Provide consistent `getItemKey` function
2. **Memoize render functions**: Wrap renderItem in useCallback
3. **Optimize item components**: Use React.memo for item components
4. **Limit overscan**: Balance smooth scrolling vs memory usage
5. **Batch updates**: Group state updates when possible

### Best Practices
```tsx
// ✅ Good: Memoized render function
const renderItem = useCallback(({ item, index }: RenderItemProps<Item>) => (
  <MemoizedItemComponent item={item} index={index} />
), [])

// ✅ Good: Stable key function
const getItemKey = useCallback((item: Item) => item.id, [])

// ✅ Good: Memoized item component
const MemoizedItemComponent = React.memo<{ item: Item; index: number }>(
  ({ item, index }) => (
    <div>
      <h3>{item.title}</h3>
      <p>#{index + 1}</p>
    </div>
  )
)
```

## Accessibility

- Proper semantic HTML structure
- Keyboard navigation support
- Screen reader compatible
- Focus management during scrolling
- ARIA attributes for list structure

## Browser Compatibility

- Modern browsers with Intersection Observer support
- Fallback handling for older browsers
- Mobile touch scrolling optimization
- High DPI display support

## Common Use Cases

1. **Photo Galleries**: Large image collections
2. **Product Catalogs**: E-commerce product grids
3. **Data Tables**: Large datasets with grid layout
4. **Social Media Feeds**: Posts, comments, user lists
5. **File Browsers**: Directory contents with thumbnails
6. **Dashboard Widgets**: Metric cards and analytics displays