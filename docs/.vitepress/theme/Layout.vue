<script setup>
import DefaultTheme from 'vitepress/theme'
import { onMounted, onUnmounted, watch, nextTick } from 'vue'
import { useRoute } from 'vitepress'
import mediumZoom from 'medium-zoom'

const { Layout } = DefaultTheme
const route = useRoute()
let zoom = null
let observer = null

const WIDE_BREAKPOINT = 1100

function isWide() {
  return window.innerWidth >= WIDE_BREAKPOINT
}

function findPrecedingH2(img, h2List) {
  for (let i = h2List.length - 1; i >= 0; i--) {
    if (h2List[i].compareDocumentPosition(img) & Node.DOCUMENT_POSITION_FOLLOWING) {
      return h2List[i]
    }
  }
  return null
}

function activateSection(sectionId) {
  const panel = document.querySelector('.screenshot-panel')
  if (!panel) return
  const docEl = document.querySelector('.vp-doc')
  docEl?.classList.toggle('appendix-focused', sectionId?.includes('_14-'))

  let targetFrame = null
  panel.querySelectorAll('.phone-frame').forEach(frame => {
    const isMatch = frame.dataset.sectionId === sectionId
    frame.classList.toggle('active', isMatch)
    frame.classList.toggle('inactive', !isMatch)
    if (isMatch) targetFrame = frame
  })

  if (targetFrame) {
    targetFrame.scrollIntoView({ behavior: 'auto', block: 'nearest', inline: 'nearest' })
  }
}

function buildPanel() {
  const docEl = document.querySelector('.vp-doc')
  if (!docEl || docEl.querySelector('.screenshot-panel')) return

  const imgs = [...docEl.querySelectorAll('img')]
  if (imgs.length === 0) return

  const h2List = [...docEl.querySelectorAll('h2')]
  const panel = document.createElement('div')
  panel.className = 'screenshot-panel'
  panel.setAttribute('aria-label', '页面截图预览')
  const sectionFrameMap = new Map()

  imgs.forEach(img => {
    const frame = document.createElement('div')
    frame.className = 'phone-frame'
    const screen = document.createElement('div')
    screen.className = 'phone-screen'
    const clonedImg = img.cloneNode(true)
    clonedImg.removeAttribute('style')
    clonedImg.setAttribute('loading', 'lazy')
    clonedImg.onerror = () => {
      screen.innerHTML = '<div style="padding:24px;text-align:center;color:#8695af;font-size:12px;">截图加载失败</div>'
    }
    screen.appendChild(clonedImg)
    frame.appendChild(screen)
    frame.setAttribute('role', 'img')
    frame.setAttribute('aria-label', clonedImg.alt || '截图')

    const h2 = findPrecedingH2(img, h2List)
    if (h2?.id) {
      frame.dataset.sectionId = h2.id
      if (!sectionFrameMap.has(h2.id)) sectionFrameMap.set(h2.id, [])
      sectionFrameMap.get(h2.id).push(frame)
    }
    panel.appendChild(frame)

    // 隐藏原图和空父段落
    img.style.display = 'none'
    const parent = img.parentElement
    if (parent?.tagName === 'P') {
      const hasOther = [...parent.childNodes].some(
        n => n !== img && n.textContent.trim() !== ''
      )
      if (!hasOther) parent.style.display = 'none'
    }
  })

  docEl.appendChild(panel)
  docEl.classList.add('two-column-layout')

  // 默认激活第一个有截图的章节
  if (sectionFrameMap.size > 0) {
    activateSection(sectionFrameMap.keys().next().value)
  }

  // IntersectionObserver 滚动联动
  observer?.disconnect()
  observer = new IntersectionObserver(
    entries => {
      const visible = entries
        .filter(e => e.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
      if (visible.length > 0) {
        const id = visible[0].target.id
        if (sectionFrameMap.has(id)) activateSection(id)
      }
    },
    { rootMargin: '-10% 0px -60% 0px', threshold: 0 }
  )
  h2List.forEach(h2 => {
    if (h2.id && sectionFrameMap.has(h2.id)) observer.observe(h2)
  })

  // medium-zoom
  zoom?.detach()
  zoom = mediumZoom('.phone-screen img', {
    margin: 24,
    background: 'rgba(0, 0, 0, 0.88)'
  })
}

function teardownPanel() {
  observer?.disconnect()
  observer = null

  const docEl = document.querySelector('.vp-doc')
  if (!docEl) return

  docEl.querySelector('.screenshot-panel')?.remove()
  docEl.classList.remove('two-column-layout')

  // 恢复原始图片和段落
  docEl.querySelectorAll('img').forEach(img => { img.style.display = '' })
  docEl.querySelectorAll('p').forEach(p => { p.style.display = '' })

  zoom?.detach()
  zoom = null
}

function reorganizeLayout() {
  nextTick(() => {
    if (route.path === '/') {
      window.location.replace('/user-manual')
      return
    }
    if (isWide()) {
      buildPanel()
    }
    // 窄屏：什么都不做，原图保持可见
  })
}

// resize 处理：宽↔窄切换时重新判断
let resizeTimer = null
function handleResize() {
  clearTimeout(resizeTimer)
  resizeTimer = setTimeout(() => {
    const hasPanel = !!document.querySelector('.screenshot-panel')
    if (isWide() && !hasPanel) {
      buildPanel()
    } else if (!isWide() && hasPanel) {
      teardownPanel()
    }
  }, 150)
}

// /delight: Scroll-to-top button
let scrollToTopBtn = null

function handleScroll() {
  if (scrollToTopBtn) {
    if (window.scrollY > 600) {
      scrollToTopBtn.classList.add('visible')
    } else {
      scrollToTopBtn.classList.remove('visible')
    }
  }
}

function createScrollToTop() {
  if (document.querySelector('.scroll-to-top')) return
  scrollToTopBtn = document.createElement('button')
  scrollToTopBtn.className = 'scroll-to-top'
  scrollToTopBtn.setAttribute('aria-label', '回到顶部')
  scrollToTopBtn.textContent = '\u2191'
  scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  })
  document.body.appendChild(scrollToTopBtn)
}

onMounted(() => {
  reorganizeLayout()
  createScrollToTop()
  window.addEventListener('resize', handleResize)
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
  window.removeEventListener('scroll', handleScroll)
  clearTimeout(resizeTimer)
  scrollToTopBtn?.remove()
})

watch(() => route.path, () => {
  teardownPanel()
  reorganizeLayout()
})
</script>

<template>
  <Layout />
</template>
