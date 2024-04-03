export default {
  appendNodes(parent, childerns) {
    childerns.forEach(node => parent.appendChild(node))
  },


  createEl (tag, classes = [], innerText = '') {
    let node = document.createElement(tag)
  
    if (innerText != '') {node.innerText = innerText}

    if (classes.length > 0) {
      classes.forEach(item => node.classList.add(item))
    }
  
    return node
  },


  async sendGET (url) {
    let request, response

    request = await fetch(url)

    if (request.ok) { response = await request.text() } 
    else { response = response.status }
    return response
  },


  async sendPOST (url, data, headers = {}) {
    let request, response, config

    if (headers == {}) {
      headers['Content-Type'] = 'application/json;charset=utf-8'
    }

    config = {}
    config['method']  = 'POST'
    config['headers'] = headers
    config['body']    = JSON.stringify(data)

    request = await fetch(url, config)
    if (request.ok) { response = await request.text() }
    else { response = response.status }
    
    return response
  },


  createImg (src, classes = [], alt = '') {
    let node = document.createElement('img')
    node.setAttribute('src', src)
    node.setAttribute('alt', alt)

    if (classes.length > 0) {
      classes.forEach(item => node.classList.add(item))
    }

    return node
  },


  printItem (selector = 'body', tag = 'pre', data = 'Empty Item') {
    let printNode, container

    container = document.querySelector(selector)
    printNode = document.createEl(tag)

    printNode.append(data)
    container.append(printNode)
  },


  getRandomNumber (from=1, to=10) {
    return Math.floor(Math.random() * (to - from + 1) + from)
  },


  sleep (seconds) {
    return new Promise(resolve => setTimeout(resolve, seconds * 1000))
  }
}