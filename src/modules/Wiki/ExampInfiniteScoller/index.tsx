import { useCallback, useState } from "react"
import InfiniteScroll from "react-infinite-scroller"

const ExampleInfiniteScoller = () => {
  const [items, setItems] = useState([1, 2])

  const [fetching, setFetching] = useState(false)

  const fetchItems = useCallback(() => {
    console.debug("new fetching")
    if (fetching) {
      return
    }
    setFetching(true)
    try {
      const _items = items
      _items.push(1)
      setItems(_items)
      console.debug("load")
    } finally {
      console.debug("final")
      setFetching(false)
    }
  }, [fetching, items])

  const loader = <div>Loading ...</div>
  return (
    <div>
      <InfiniteScroll loadMore={fetchItems} hasMore={true} loader={loader}>
        <>
          {items.map((item, index) => (
            <>
              <>{item}</>
            </>
          ))}
        </>
      </InfiniteScroll>
    </div>
  )
}

export default ExampleInfiniteScoller
