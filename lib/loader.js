

/*
https://github.com/feross/load-script2

usage

const script = await loadScript2('foo.js')

API
promise = loadScript(src, [attrs], [parentNode])
Append a <script> node with the given src URL to the <head> element in the DOM.

src
Any url that you would like to load. May be absolute or relative.

attrs (optional)
An object that contains HTML attributes to set on the <script> tag. For example, the value { id: 'hi' } would set the attribute id="hi" on the <script> tag before it is injected.

parentNode (optional)
The HTML node to which the <script> tag will be appended. If not specified, defaults to the <head> tag.

promise
Returns a promise which resolves to the script node that was appended to the DOM, or rejects with err if any occurred.

license
MIT. Copyright (c) Feross Aboukhadijeh.

*/

function loadScript2 (src, attrs, parentNode)
{
  return new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.async = true
    script.src = src

    for (const [k, v] of Object.entries(attrs || {})) {
      script.setAttribute(k, v)
    }

    script.onload = () => {
      script.onerror = script.onload = null
      resolve(script)
    }

    script.onerror = () => {
      script.onerror = script.onload = null
      reject(new Error(`Failed to load ${src}`))
    }

    const node = parentNode || document.head || document.getElementsByTagName('head')[0]
    node.appendChild(script)
  })
}
