'use client'
import { useEffect, useState } from 'react'

export default function Search() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [pagefind, setPagefind] = useState<any>(null)
  const [results, setResults] = useState<any[]>([])

  useEffect(() => {
    function onKeydown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setOpen(true)
      }
      if (e.key === 'Escape') {
        setOpen(false)
      }
    }
    window.addEventListener('keydown', onKeydown)
    return () => window.removeEventListener('keydown', onKeydown)
  }, [])

  useEffect(() => {
    if (!open || pagefind) return
    const script = document.createElement('script')
    script.src = '/pagefind/pagefind.js'
    script.type = 'text/javascript'
    script.onload = async () => {
      const pf = (window as any).pagefind
      if (pf) {
        await pf.init()
        setPagefind(pf)
      }
    }
    document.body.appendChild(script)
    return () => {
      document.body.removeChild(script)
    }
  }, [open, pagefind])

  async function handleSearch(term: string) {
    setQuery(term)
    if (!pagefind || !term) {
      setResults([])
      return
    }
    const search = await pagefind.search(term)
    const res = await Promise.all(search.results.map((r: any) => r.data()))
    setResults(res)
    ;(window as any).plausible?.('search', { props: { query: term } })
  }

  return (
    <div>
      {open && (
        <div
          className="fixed inset-0 z-50 bg-black/50 flex items-start justify-center p-4"
          onClick={() => setOpen(false)}
        >
          <div
            className="bg-white dark:bg-gray-900 w-full max-w-xl rounded p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <input
              autoFocus
              type="text"
              value={query}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search..."
              className="w-full mb-4 border p-2 rounded bg-gray-50 dark:bg-gray-800"
            />
            <ul className="space-y-4 max-h-96 overflow-y-auto">
              {results.map((r) => (
                <li key={r.url}>
                  <a href={r.url} className="block" onClick={() => setOpen(false)}>
                    <h3 className="font-semibold" dangerouslySetInnerHTML={{ __html: r.meta?.title || r.url }} />
                    {r.excerpt && (
                      <p
                        className="text-sm text-gray-600 dark:text-gray-400"
                        dangerouslySetInnerHTML={{ __html: r.excerpt }}
                      />
                    )}
                    {r.meta?.tags && (
                      <div className="mt-1 flex flex-wrap gap-1">
                        {String(r.meta.tags)
                          .split(',')
                          .map((tag: string) => (
                            <span
                              key={tag}
                              className="text-xs bg-gray-200 dark:bg-gray-700 px-1 rounded"
                            >
                              {tag.trim()}
                            </span>
                          ))}
                      </div>
                    )}
                  </a>
                </li>
              ))}
              {query && results.length === 0 && <li>No results found.</li>}
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}

