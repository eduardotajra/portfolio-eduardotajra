import { useEffect, useRef } from 'react'

// Tinta no papel, simulada na GPU em tempo real.
// Duas texturas se revezam (ping-pong): a cada quadro a tinta escorre pela
// fibra do papel, espalha para os vizinhos e seca um pouco. O cursor deixa um
// traço; parado, o papel recebe uns pingos sozinho. WebGL puro, sem biblioteca.

const VERTICE = `
attribute vec2 a;
varying vec2 v;
void main() { v = a * 0.5 + 0.5; gl_Position = vec4(a, 0.0, 1.0); }
`

const SIMULA = `
precision highp float;
varying vec2 v;
uniform sampler2D uAnt;
uniform vec2 uTexel;
uniform vec2 uP0;
uniform vec2 uP1;
uniform float uForca;
uniform float uRaio;
uniform float uTempo;
uniform float uAspecto;

float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x), mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x), f.y);
}
float segmento(vec2 p, vec2 a, vec2 b) {
  vec2 pa = p - a;
  vec2 ba = b - a;
  float h = clamp(dot(pa, ba) / max(dot(ba, ba), 1e-6), 0.0, 1.0);
  return length(pa - ba * h);
}

void main() {
  // A tinta escorre devagar seguindo um campo de ruído (a fibra do papel).
  vec2 fluxo = vec2(noise(v * 5.0 + uTempo * 0.04) - 0.5, noise(v * 5.0 + 19.0 + uTempo * 0.04) - 0.5) * uTexel * 1.8;
  vec2 uv = v - fluxo;
  float c = texture2D(uAnt, uv).r;
  float vizinhos = texture2D(uAnt, uv + vec2(uTexel.x, 0.0)).r + texture2D(uAnt, uv - vec2(uTexel.x, 0.0)).r
                 + texture2D(uAnt, uv + vec2(0.0, uTexel.y)).r + texture2D(uAnt, uv - vec2(0.0, uTexel.y)).r;
  float fibra = 0.55 + 0.45 * noise(v * vec2(260.0, 48.0));
  float d = mix(c, vizinhos * 0.25, 0.24 * fibra);
  d = max(d * 0.992 - 0.0022, 0.0);

  // Traço novo do cursor: distância até o segmento percorrido neste quadro.
  vec2 p = v * vec2(uAspecto, 1.0);
  float dist = segmento(p, uP0 * vec2(uAspecto, 1.0), uP1 * vec2(uAspecto, 1.0));
  d += uForca * exp(-(dist * dist) / (uRaio * uRaio)) * (0.7 + 0.3 * fibra);
  gl_FragColor = vec4(min(d, 1.0), 0.0, 0.0, 1.0);
}
`

const MOSTRA = `
precision highp float;
varying vec2 v;
uniform sampler2D uTinta;
uniform vec2 uTexel;
uniform vec3 uCor;
float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
void main() {
  float d = texture2D(uTinta, v).r;
  // Borda escura de aquarela: onde a densidade muda mais rápido.
  float gx = texture2D(uTinta, v + vec2(uTexel.x, 0.0)).r - texture2D(uTinta, v - vec2(uTexel.x, 0.0)).r;
  float gy = texture2D(uTinta, v + vec2(0.0, uTexel.y)).r - texture2D(uTinta, v - vec2(0.0, uTexel.y)).r;
  float borda = clamp(length(vec2(gx, gy)) * 6.0, 0.0, 1.0);
  // Mancha com contorno definido (tinta que o papel bebeu), nunca um brilho difuso.
  float corpo = smoothstep(0.05, 0.1, d);
  float grao = 0.82 + 0.18 * hash(floor(gl_FragCoord.xy * 0.5));
  float a = clamp(corpo * (0.46 + 0.16 * smoothstep(0.1, 0.8, d)) * grao + borda * corpo * 0.55, 0.0, 0.82);
  gl_FragColor = vec4(uCor * a, a);
}
`

function compila(gl, tipo, fonte) {
  const s = gl.createShader(tipo)
  gl.shaderSource(s, fonte)
  gl.compileShader(s)
  return gl.getShaderParameter(s, gl.COMPILE_STATUS) ? s : null
}

function programa(gl, fs) {
  const v = compila(gl, gl.VERTEX_SHADER, VERTICE)
  const f = compila(gl, gl.FRAGMENT_SHADER, fs)
  if (!v || !f) return null
  const p = gl.createProgram()
  gl.attachShader(p, v)
  gl.attachShader(p, f)
  gl.linkProgram(p)
  return gl.getProgramParameter(p, gl.LINK_STATUS) ? p : null
}

export default function TintaViva({ className = '', cor = [0.12, 0.2, 0.5] }) {
  const ref = useRef(null)
  const corRef = useRef(cor)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const gl = canvas.getContext('webgl', { premultipliedAlpha: true, alpha: true, antialias: false })
    if (!gl) return
    const pSim = programa(gl, SIMULA)
    const pMostra = programa(gl, MOSTRA)
    if (!pSim || !pMostra) return

    const buf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buf)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)

    const u = (p, n) => gl.getUniformLocation(p, n)
    const sim = {
      ant: u(pSim, 'uAnt'), texel: u(pSim, 'uTexel'), p0: u(pSim, 'uP0'), p1: u(pSim, 'uP1'),
      forca: u(pSim, 'uForca'), raio: u(pSim, 'uRaio'), tempo: u(pSim, 'uTempo'), aspecto: u(pSim, 'uAspecto'),
    }
    const mostra = { tinta: u(pMostra, 'uTinta'), texel: u(pMostra, 'uTexel'), cor: u(pMostra, 'uCor') }

    let largura = 0
    let altura = 0
    let alvos = []
    const novaTextura = () => {
      const tex = gl.createTexture()
      gl.bindTexture(gl.TEXTURE_2D, tex)
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, largura, altura, 0, gl.RGBA, gl.UNSIGNED_BYTE, null)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
      const fb = gl.createFramebuffer()
      gl.bindFramebuffer(gl.FRAMEBUFFER, fb)
      gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, tex, 0)
      gl.clearColor(0, 0, 0, 1)
      gl.clear(gl.COLOR_BUFFER_BIT)
      return { tex, fb }
    }
    const ajusta = () => {
      const r = canvas.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
      canvas.width = Math.max(2, Math.round(r.width * dpr))
      canvas.height = Math.max(2, Math.round(r.height * dpr))
      // A simulação roda em meia resolução: a tinta é macia, ninguém nota.
      largura = Math.max(2, Math.round(r.width * 0.5))
      altura = Math.max(2, Math.round(r.height * 0.5))
      alvos.forEach(({ tex, fb }) => {
        gl.deleteTexture(tex)
        gl.deleteFramebuffer(fb)
      })
      alvos = [novaTextura(), novaTextura()]
    }
    ajusta()
    const ro = new ResizeObserver(ajusta)
    ro.observe(canvas)

    // Cursor em coordenadas da textura (0..1, y para cima).
    const cursor = { x: -1, y: -1, px: -1, py: -1, vel: 0, ultimo: 0 }
    const move = (e) => {
      const r = canvas.getBoundingClientRect()
      const x = (e.clientX - r.left) / r.width
      const y = 1 - (e.clientY - r.top) / r.height
      if (x < 0 || x > 1 || y < 0 || y > 1) return
      cursor.x = x
      cursor.y = y
      cursor.ultimo = performance.now()
    }
    window.addEventListener('pointermove', move, { passive: true })

    const liga = (p) => {
      gl.useProgram(p)
      gl.bindBuffer(gl.ARRAY_BUFFER, buf)
      const loc = gl.getAttribLocation(p, 'a')
      gl.enableVertexAttribArray(loc)
      gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0)
    }

    let visivel = true
    let quadro = 0
    let proximoPingo = performance.now() + 1200
    const inicio = performance.now()
    let atual = 0

    const passo = (agora) => {
      quadro = 0
      let p0 = [-5, -5]
      let p1 = [-5, -5]
      let forca = 0
      let raio = 0.02
      if (cursor.x >= 0 && cursor.px >= 0) {
        const dx = cursor.x - cursor.px
        const dy = cursor.y - cursor.py
        const vel = Math.hypot(dx, dy)
        cursor.vel = cursor.vel * 0.8 + vel * 0.2
        if (vel > 0.0005) {
          p0 = [cursor.px, cursor.py]
          p1 = [cursor.x, cursor.y]
          forca = Math.min(0.55, 0.18 + cursor.vel * 9)
          raio = 0.012 + Math.min(0.02, cursor.vel * 0.4)
        }
      }
      // Papel parado recebe um pingo de vez em quando, para nunca ficar morto.
      if (forca === 0 && agora > proximoPingo && agora - cursor.ultimo > 2500) {
        // Pingos só na faixa vazia de baixo, longe do título e da mesa.
        const x = 0.06 + Math.random() * 0.6
        const y = 0.05 + Math.random() * 0.14
        p0 = [x, y]
        p1 = [x + 0.001, y]
        forca = 0.9
        raio = 0.018 + Math.random() * 0.02
        proximoPingo = agora + 1800 + Math.random() * 1600
      }
      cursor.px = cursor.x
      cursor.py = cursor.y

      // Simula: lê a textura atual e escreve na outra.
      const de = alvos[atual]
      const para = alvos[1 - atual]
      liga(pSim)
      gl.bindFramebuffer(gl.FRAMEBUFFER, para.fb)
      gl.viewport(0, 0, largura, altura)
      gl.activeTexture(gl.TEXTURE0)
      gl.bindTexture(gl.TEXTURE_2D, de.tex)
      gl.uniform1i(sim.ant, 0)
      gl.uniform2f(sim.texel, 1 / largura, 1 / altura)
      gl.uniform2f(sim.p0, p0[0], p0[1])
      gl.uniform2f(sim.p1, p1[0], p1[1])
      gl.uniform1f(sim.forca, forca)
      gl.uniform1f(sim.raio, raio)
      gl.uniform1f(sim.tempo, (agora - inicio) / 1000)
      gl.uniform1f(sim.aspecto, largura / altura)
      gl.drawArrays(gl.TRIANGLES, 0, 3)
      atual = 1 - atual

      // Mostra no canvas, com a cor da tinta.
      liga(pMostra)
      gl.bindFramebuffer(gl.FRAMEBUFFER, null)
      gl.viewport(0, 0, canvas.width, canvas.height)
      gl.bindTexture(gl.TEXTURE_2D, para.tex)
      gl.uniform1i(mostra.tinta, 0)
      gl.uniform2f(mostra.texel, 1 / largura, 1 / altura)
      gl.uniform3f(mostra.cor, ...corRef.current)
      gl.clearColor(0, 0, 0, 0)
      gl.clear(gl.COLOR_BUFFER_BIT)
      gl.drawArrays(gl.TRIANGLES, 0, 3)

      if (visivel && !document.hidden) quadro = requestAnimationFrame(passo)
    }
    const retoma = () => {
      if (!quadro && visivel && !document.hidden) quadro = requestAnimationFrame(passo)
    }
    const io = new IntersectionObserver(([e]) => {
      visivel = e.isIntersecting
      retoma()
    })
    io.observe(canvas)
    document.addEventListener('visibilitychange', retoma)
    quadro = requestAnimationFrame(passo)

    return () => {
      cancelAnimationFrame(quadro)
      io.disconnect()
      ro.disconnect()
      window.removeEventListener('pointermove', move)
      document.removeEventListener('visibilitychange', retoma)
      alvos.forEach(({ tex, fb }) => {
        gl.deleteTexture(tex)
        gl.deleteFramebuffer(fb)
      })
      gl.deleteBuffer(buf)
      gl.deleteProgram(pSim)
      gl.deleteProgram(pMostra)
    }
  }, [])

  return <canvas ref={ref} aria-hidden="true" className={className} />
}
