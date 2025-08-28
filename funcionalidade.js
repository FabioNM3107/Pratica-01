// Tema claro/escuro (toggle simples)
ctx.moveTo(m.l, m.t); ctx.lineTo(m.l, H - m.b);
ctx.moveTo(m.l, H - m.b); ctx.lineTo(W - m.r, H - m.b);
ctx.stroke();


// Grid horizontal (3 linhas)
ctx.setLineDash([4,6]);
for(let g=1; g<=3; g++){
const y = m.t + (ih * g/4);
ctx.beginPath(); ctx.moveTo(m.l, y); ctx.lineTo(W - m.r, y); ctx.stroke();
}
ctx.setLineDash([]);


// Linha
ctx.strokeStyle = '#38bdf8';
ctx.lineWidth = 3;
ctx.beginPath();
points.forEach((p,idx)=>{ const X = sx(p.x), Y = sy(p.y); idx? ctx.lineTo(X,Y): ctx.moveTo(X,Y); });
ctx.stroke();


// Área
const grad = ctx.createLinearGradient(0, m.t, 0, H - m.b);
grad.addColorStop(0, 'rgba(56,189,248,0.50)');
grad.addColorStop(1, 'rgba(56,189,248,0.05)');
ctx.fillStyle = grad;
ctx.beginPath();
points.forEach((p,idx)=>{ const X = sx(p.x), Y = sy(p.y); idx? ctx.lineTo(X,Y): ctx.moveTo(X,Y); });
ctx.lineTo(sx(points.at(-1).x), H - m.b);
ctx.lineTo(sx(points[0].x), H - m.b);
ctx.closePath();
ctx.fill();


// Marcador final
const last = points.at(-1);
ctx.fillStyle = '#22c55e';
ctx.beginPath(); ctx.arc(sx(last.x), sy(last.y), 5, 0, Math.PI*2); ctx.fill();


// Rótulos e ticks
ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--muted').trim() || '#94a3b8';
ctx.font = '12px Inter, system-ui, sans-serif';
ctx.textAlign = 'center';
for(let ano=0; ano<=xMax; ano++){
const X = sx(ano);
ctx.fillText(String(ano)+'a', X, H - m.b + 18);
ctx.beginPath(); ctx.moveTo(X, H - m.b - 4); ctx.lineTo(X, H - m.b + 4); ctx.strokeStyle='rgba(148,163,184,0.35)'; ctx.stroke();
}
}


// Ações
const calcBtn = document.getElementById('calcular');
const clearBtn = document.getElementById('limpar');
if (calcBtn) calcBtn.addEventListener('click', calc);
if (clearBtn) clearBtn.addEventListener('click', () => {
const inicial = document.getElementById('inicial');
const mensal = document.getElementById('mensal');
const taxa = document.getElementById('taxa');
const anos = document.getElementById('anos');
if(inicial) inicial.value = 1000;
if(mensal) mensal.value = 200;
if(taxa) taxa.value = 10;
if(anos) anos.value = 5;
calc();
});


// Inicializa
window.addEventListener('load', () => { calc(); });
window.addEventListener('resize', calc);
