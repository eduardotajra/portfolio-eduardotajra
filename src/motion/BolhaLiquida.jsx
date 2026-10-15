import { useEffect, useRef } from 'react'

// Renderização em tempo real: uma cena 3D calculada pixel a pixel na GPU
// (raymarching). Quatro esferas se fundem como líquido; uma delas segue o mouse.
// WebGL puro, sem biblioteca: o shader inteiro está aqui embaixo.

const VERTICE = `
attribute vec2 a;
void main() { gl_Position = vec4(a, 0.0, 1.0); }
`

const FRAGMENTO = `
precision highp float;
uniform vec2 uRes;
uniform float uTempo;
uniform vec2 uMouse;

float smin(float a, float b, float k) {
  float h = clamp(0.5 + 0.5 * (b - a) / k, 0.0, 1.0);
  return mix(b, a, h) - k * h * (1.0 - h);
}

float cena(vec3 p) {
  float t = uTempo * 0.45;
  vec3 a = vec3(sin(t) * 0.95, cos(t * 0.8) * 0.45, sin(t * 0.6) * 0.4);
  vec3 b = vec3(-cos(t * 0.7) * 0.85, sin(t * 0.9) * 0.55, cos(t * 0.5) * 0.35);
  vec3 c = vec3(uMouse.x * 1.25, uMouse.y * 0.85, 0.35);
  float onda = 0.035 * sin(p.x * 6.0 + uTempo) * sin(p.y * 5.0 + uTempo * 1.3);
  float d = length(p) - 0.68 + onda;
  d = smin(d, length(p - a) - 0.42, 0.55);
  d = smin(d, length(p - b) - 0.38, 0.55);
  d = smin(d, length(p - c) - 0.3, 0.6);
  return d;
}

vec3 normal(vec3 p) {
  vec2 e = vec2(0.0025, 0.0);
  return normalize(vec3(
    cena(p + e.xyy) - cena(p - e.xyy),
    cena(p + e.yxy) - cena(p - e.yxy),
    cena(p + e.yyx) - cena(p - e.yyx)
  ));
}

void main() {
  vec2 uv = (gl_FragCoord.xy * 2.0 - uRes) / min(uRes.x, uRes.y);
  vec3 ro = vec3(0.0, 0.0, 3.3);
  vec3 rd = normalize(vec3(uv * 0.95, -1.7));
  float t = 0.0;
  float d = 1.0;
  float dmin = 10.0;
  for (int i = 0; i < 70; i++) {
    d = cena(ro + rd * t);
    dmin = min(dmin, d);
    if (d < 0.002 || t > 7.0) break;
    t += d;
  }
  vec3 ciano = vec3(0.133, 0.827, 0.933);
  // Raio que passou perto da superfície: vira um halo suave (e esconde o serrilhado).
  if (d > 0.01) {
    float halo = exp(-dmin * 22.0) * 0.45;
    gl_FragColor = vec4(mix(ciano, vec3(0.506, 0.549, 0.973), 0.5) * halo, halo);
    return;
  }

  vec3 p = ro + rd * t;
  vec3 n = normal(p);
  vec3 luz = normalize(vec3(0.6, 0.8, 0.7));
  float dif = max(dot(n, luz), 0.0);
  float esp = pow(max(dot(reflect(rd, n), luz), 0.0), 40.0);
  float fresnel = pow(1.0 - max(dot(n, -rd), 0.0), 2.4);

  vec3 indigo = vec3(0.506, 0.549, 0.973);
  vec3 roxo = vec3(0.753, 0.518, 0.988);
  vec3 cor = mix(indigo, ciano, 0.5 + 0.5 * n.y);
  cor = mix(cor, roxo, 0.35 + 0.35 * sin(n.x * 3.0 + uTempo * 0.6));
  vec3 c = cor * (0.3 + 0.75 * dif) + fresnel * ciano * 1.1 + esp * 1.1;
  float alfa = 0.92;
  gl_FragColor = vec4(c * alfa, alfa);
}
`

function compila(gl, tipo, fonte) {
  const s = gl.createShader(tipo)
  gl.shaderSource(s, fonte)
  gl.compileShader(s)
  return gl.getShaderParameter(s, gl.COMPILE_STATUS) ? s : null
}

export default function BolhaLiquida({ className = '' }) {
  const ref = useRef(null)

  useEffect(() => {
    const canvas = ref.current
    const gl = canvas?.getContext('webgl', { premultipliedAlpha: true, antialias: false, alpha: true })
    if (!gl) return

    const vs = compila(gl, gl.VERTEX_SHADER, VERTICE)
    const fs = compila(gl, gl.FRAGMENT_SHADER, FRAGMENTO)
    if (!vs || !fs) return
    const prog = gl.createProgram()
    gl.attachShader(prog, vs)
    gl.attachShader(prog, fs)
    gl.linkProgram(prog)
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return
    gl.useProgram(prog)

    // Um triângulo que cobre a tela inteira.
    const buf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buf)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)
    const loc = gl.getAttribLocation(prog, 'a')
    gl.enableVertexAttribArray(loc)
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0)

    const uRes = gl.getUniformLocation(prog, 'uRes')
    const uTempo = gl.getUniformLocation(prog, 'uTempo')
    const uMouse = gl.getUniformLocation(prog, 'uMouse')

    // Metade da resolução: o líquido é macio, ninguém nota, e a GPU agradece.
    const escala = Math.min(window.devicePixelRatio || 1, 2) * (window.innerWidth < 768 ? 0.45 : 0.6)
    const ajusta = () => {
      const r = canvas.getBoundingClientRect()
      canvas.width = Math.max(1, Math.round(r.width * escala))
      canvas.height = Math.max(1, Math.round(r.height * escala))
      gl.viewport(0, 0, canvas.width, canvas.height)
      gl.uniform2f(uRes, canvas.width, canvas.height)
    }
    ajusta()
    const ro = new ResizeObserver(ajusta)
    ro.observe(canvas)

    const alvo = { x: 0.4, y: 0.3 }
    const mouse = { x: 0.4, y: 0.3 }
    const move = (e) => {
      const r = canvas.getBoundingClientRect()
      alvo.x = Math.max(-1.4, Math.min(1.4, ((e.clientX - r.left) / r.width) * 2 - 1))
      alvo.y = Math.max(-1.2, Math.min(1.2, -(((e.clientY - r.top) / r.height) * 2 - 1)))
    }
    window.addEventListener('pointermove', move, { passive: true })

    const parado = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let visivel = true
    let quadro = 0
    const inicio = performance.now()

    const desenha = (agora) => {
      quadro = 0
      mouse.x += (alvo.x - mouse.x) * 0.06
      mouse.y += (alvo.y - mouse.y) * 0.06
      gl.uniform1f(uTempo, parado ? 2.0 : (agora - inicio) / 1000)
      gl.uniform2f(uMouse, mouse.x, mouse.y)
      gl.drawArrays(gl.TRIANGLES, 0, 3)
      if (!parado && visivel && !document.hidden) quadro = requestAnimationFrame(desenha)
    }
    const retoma = () => {
      if (!quadro && visivel && !document.hidden) quadro = requestAnimationFrame(desenha)
    }

    // Fora da tela ou com a aba escondida, a cena para de ser calculada.
    const io = new IntersectionObserver(([e]) => {
      visivel = e.isIntersecting
      retoma()
    })
    io.observe(canvas)
    document.addEventListener('visibilitychange', retoma)
    quadro = requestAnimationFrame(desenha)

    return () => {
      cancelAnimationFrame(quadro)
      io.disconnect()
      ro.disconnect()
      window.removeEventListener('pointermove', move)
      document.removeEventListener('visibilitychange', retoma)
      // Sem loseContext(): o mesmo canvas pode ser montado de novo (StrictMode,
      // troca de rota) e um contexto perdido não volta.
      gl.deleteBuffer(buf)
      gl.deleteProgram(prog)
      gl.deleteShader(vs)
      gl.deleteShader(fs)
    }
  }, [])

  return <canvas ref={ref} aria-hidden="true" className={className} />
}
