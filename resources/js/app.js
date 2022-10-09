import 'unpoly'
import 'unpoly/unpoly-migrate'

import Alpine from 'alpinejs'
import teleport from 'alpine-teleport'
import intersect from '@alpinejs/intersect'
import collapse from '@alpinejs/collapse'

import '../css/highlight.css'
import * as Quill from 'quill'

import '../css/app.css'
import 'unpoly/unpoly.css'


up.fragment.config.mainTargets.push('[layout-root]')
up.fragment.config.mainTargets.push('[layout-body]')
up.fragment.config.mainTargets.push('[layout-main]')
up.fragment.config.mainTargets.push('[layout-navbar]')

up.transition('fade', async (oldElement, newElement, options) => {
  if (oldElement.id !== 'navbar') {
    await Promise.all([
      up.animate(oldElement, 'fade-out', options),
      up.animate(newElement, 'fade-in', options)
    ])
  }
})

up.on('up:fragment:loaded', (event) => {
  let fullReload = event.response.getHeader('X-Full-Reload')

  if (fullReload) {
    // Prevent the fragment update and don't update browser history
    event.preventDefault()

    // Make a full page load for the same request.
    event.request.loadPage()
  }
})

up.on('up:fragment:inserted', function() {
  const editorContainer = document.getElementById('editor');
  if (editorContainer) {
    const editor = new Quill('#editor', {
      modules: {
        syntax: true,
        toolbar: [
          ['bold', 'italic', 'underline', 'link'],
          ['image'],
          [{ 'header': [2, 3, false] }],
          [{ 'color': [] }, { 'background': [] }],
          [{ 'list': 'ordered'}, { 'list': 'bullet' }],
          ['code-block'],
          ['clean']
        ]
      },
      placeholder: 'Contenu de votre article',
      theme: 'snow'
    })

    const button = document.querySelector('#btn-submit')
    const input = document.querySelector('#content')

    button.addEventListener('click', (event) => {
      event.preventDefault()
      input.value = editor.root.innerHTML
      input.form.submit()
    })
  }

  const navbar = document.querySelector('#navbar')
  if (navbar) {
    let oldScrollY = 0
    navbar.style.transform = 'translateY(0)'

    document.addEventListener('scroll', () => {
      if (window.innerWidth > 390) {
        if (oldScrollY >= window.scrollY) navbar.style.transform = 'translateY(0)'
        else navbar.style.transform = 'translateY(-64px)'

        oldScrollY = window.scrollY
      }
    })
  }
})


Alpine.data('file', function () {
  return {
    picture: null,
    onChange: function (event) {
      const file = event.target.files[0]

      if (file) {
        this.picture = URL.createObjectURL(file)
      }
    },
  }
})

Alpine.data('slideFeatures', () => ({
    activeTab: 'tab1',
    index: 0,
    slide () {
        const box1 = document.getElementById('box1')
        const box2 = document.getElementById('box2')
        const box3 = document.getElementById('box3')

        box1.style.transform = `translateX(${-this.index*100}%`
        box2.style.transform = `translateX(${-this.index*100}%`
        box3.style.transform = `translateX(${-this.index*100}%`
    }
}))

Alpine.data('slideAvis', () => ({
  activeAvis: 'avis1',
  index: 0,
  slide () {
    console.log(this.activeAvis)
  }
}))

Alpine.data('reveal', () => ({
  reveal: (element) => {
    element.classList.add('revealed')
  },
}))

Alpine.plugin(teleport)
Alpine.plugin(intersect)
Alpine.plugin(collapse)
Alpine.start()
