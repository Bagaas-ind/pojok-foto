// @ts-nocheck
/* eslint-disable */
// Mesin gambar photobooth (canvas): tata letak, template bingkai, filter film, stiker, dan ekspor.
export const LAYOUTS:any={
 strip4:{name:'Strip 4 foto',n:4,W:600,H:1800,t:180,cells:i=>[40,180+i*366,520,340]},
 strip3:{name:'Strip 3 foto',n:3,W:600,H:1600,t:180,cells:i=>[40,180+i*426,520,400]},
 strip2:{name:'Strip 2 foto',n:2,W:600,H:1180,t:180,cells:i=>[40,180+i*426,520,400]},
 grid4:{name:'Kotak 2×2',n:4,W:1160,H:1500,t:200,cells:i=>[60+(i%2)*560,200+Math.floor(i/2)*560,520,520]},
 polaroid:{name:'Polaroid',n:1,W:900,H:1250,t:170,cells:()=>[60,170,780,780]}
};
const FONT={ser:'"Instrument Serif",Georgia,serif',pf:'"Playfair Display",Georgia,serif',sans:'"DM Sans",system-ui,sans-serif',scr:'"Pinyon Script","Instrument Serif",cursive'};
function sparkle(c,x,y,r){c.beginPath();c.moveTo(x,y-r);c.quadraticCurveTo(x,y,x+r,y);c.quadraticCurveTo(x,y,x,y+r);c.quadraticCurveTo(x,y,x-r,y);c.quadraticCurveTo(x,y,x,y-r);c.fill()}
const fit=(c,s,mk,sz,mw)=>{c.font=mk(sz);const w=c.measureText(s).width;return w>mw?sz*mw/w:sz};
function sp(c,s,x,y,ls){const a=[...s],w=a.map(ch=>c.measureText(ch).width+ls),tot=w.reduce((p,q)=>p+q,0)-ls;let cx=x-tot/2;c.textAlign='left';a.forEach((ch,i)=>{c.fillText(ch,cx,y);cx+=w[i]});c.textAlign='center'}
function bars(c,x,y,w,h,seed){let s=seed,cx=x;c.fillStyle='#111';while(cx<x+w-6){s=(s*9301+49297)%233280;const bw=2+Math.floor(s/233280*5);if((s>>3)&1)c.fillRect(cx,y,bw,h);cx+=bw+1+(s%3)}}
const p2=n=>String(n).padStart(2,'0');
const dstr=d=>d.toLocaleDateString('id-ID',{day:'numeric',month:'long',year:'numeric'});
const fend=l=>{const e=l.cells(l.n-1);return e[1]+e[3]};
function dHead(c,l,T,k){c.fillStyle=k.hink||k.ink;c.textAlign='center';c.textBaseline='middle';const sz=fit(c,T.t,z=>'italic 400 '+z+'px '+FONT.ser,l.W>1000?92:66,l.W-120);c.font='italic 400 '+sz+'px '+FONT.ser;c.fillText(T.t,l.W/2,l.t/2+4)}
function dFoot(c,l,T,k){const end=fend(l),cy=end+(l.H-end)/2;c.fillStyle=k.ink;c.textAlign='center';c.textBaseline='middle';c.font='700 24px '+FONT.sans;if(T.s)sp(c,T.s.toUpperCase(),l.W/2,cy-14,5);c.font='500 24px '+FONT.sans;c.globalAlpha=.75;c.fillText(dstr(T.d),l.W/2,cy+(T.s?24:0));c.globalAlpha=1}
export const BGS:any[]=[
{id:'tiket',name:'Tiket Merah',ink:'#6B1414',fr:{p:5,r:16,c:'#6B1414'},
 paint(c,w,h){c.fillStyle='#6B1414';c.fillRect(0,0,w,h);c.fillStyle='#E9D9B8';c.fillRect(16,16,w-32,h-32);c.fillStyle='#6B1414';for(let y=34;y<h-16;y+=36)[16,w-16].forEach(x=>{c.beginPath();c.arc(x,y,8,0,7);c.fill()})},
 head(c,l,T,k){c.fillStyle=k.ink;c.textBaseline='middle';const t=T.t.toUpperCase(),z=fit(c,t,q=>'700 '+q+'px '+FONT.pf,30,l.W-170);c.font='700 '+z+'px '+FONT.pf;sp(c,t,l.W/2,76,3);[-1,0,1].forEach(d=>{c.save();c.translate(l.W/2+d*46,126);glyph(c,'star',34,'#B3262E');c.restore()})},
 foot(c,l,T,k){const y=fend(l)+24;c.strokeStyle='#B3262E';c.lineWidth=3;c.beginPath();for(let x=44,i=0;x<l.W-44;x+=12,i++)c.lineTo(x,y+(i%2?6:-6));c.stroke();bars(c,l.W/2-170,y+30,340,66,+T.d%233280);c.fillStyle='#111';c.textBaseline='middle';c.font='500 20px '+FONT.sans;sp(c,p2(T.d.getDate())+p2(T.d.getMonth()+1)+String(T.d.getFullYear()).slice(2)+' 0',l.W/2,y+116,6)}},
{id:'editorial',name:'Editorial',ink:'#111',fr:{p:3,r:8,c:'#111'},
 paint(c,w,h){c.fillStyle='#F5F3EF';c.fillRect(0,0,w,h)},
 head(c,l,T){const W=l.W,m=40,t=T.t.toUpperCase(),q=.62;c.fillStyle='#111';c.textBaseline='alphabetic';c.textAlign='center';const z=fit(c,t,u=>'900 '+u+'px '+FONT.pf,120,(W-2*m)/q);c.save();c.translate(W/2,92);c.scale(q,1);c.font='900 '+z+'px '+FONT.pf;c.fillText(t,0,0);c.restore();c.fillRect(m,104,W-2*m,2);c.textBaseline='middle';c.font='700 15px '+FONT.sans;c.strokeStyle='#111';c.lineWidth=1.5;[[m+48,p2(T.d.getDate())+'/'+p2(T.d.getMonth()+1)],[W-m-48,String(T.d.getFullYear())]].forEach(([x,s])=>{rr(c,x-46,126,92,30,15);c.stroke();c.fillText(s,x,142)});sp(c,(T.s||'').toUpperCase(),W/2,142,3);c.fillRect(m,166,W-2*m,2)},
 foot(c,l,T){const end=fend(l),y=end+(l.H-end)/2;c.fillStyle='#111';c.fillRect(40,end+18,l.W-80,2);c.textAlign='left';c.textBaseline='middle';c.font='900 26px '+FONT.pf;const u=T.t.toUpperCase()+'   ✦   ';c.save();c.beginPath();c.rect(40,end+26,l.W-80,l.H-end-40);c.clip();let x=40;while(x<l.W){c.fillText(u,x,y+8);x+=c.measureText(u).width}c.restore();c.textAlign='center'}},
{id:'koran',name:'Koran',ink:'#111',fr:{p:9,r:16,c:'#111'},
 paint(c,w,h){c.fillStyle='#F1E4C4';c.fillRect(0,0,w,h);c.fillStyle='rgba(60,45,20,.14)';let s=7;for(let y=10;y<h;y+=15){s=(s*9301+49297)%233280;c.fillRect(8,y,10+s%24,4);c.fillRect(w-18-s%24,y,10+s%24,4)}},
 head(c,l,T){const W=l.W,m=40,t=T.t.toUpperCase();c.fillStyle='#111';c.textBaseline='alphabetic';c.textAlign='center';const z=fit(c,t,u=>'900 '+u+'px '+FONT.pf,100,W-2*m);c.font='900 '+z+'px '+FONT.pf;c.fillText(t,W/2,86);c.fillRect(m,102,W-2*m,4);c.fillRect(m,110,W-2*m,1.5);c.textBaseline='middle';c.font='700 14px '+FONT.sans;c.textAlign='left';c.fillText('LOCAL STORY',m,136);c.textAlign='right';c.fillText('SINCE '+T.d.getFullYear(),W-m,136);c.textAlign='center';sp(c,(T.s||'').toUpperCase(),W/2,136,2);c.fillRect(m,154,W-2*m,1.5)},
 foot(c,l,T){const end=fend(l),cy=end+(l.H-end)/2;c.fillStyle='#111';c.textBaseline='middle';c.font='700 30px '+FONT.sans;sp(c,String(+T.d).slice(-13),l.W/2,cy,12)}},
{id:'maroon',name:'Maroon Script',ink:'#E7D5BF',fr:{p:5,r:2,c:'#E7D5BF'},
 paint(c,w,h){c.fillStyle='#5A1A1E';c.fillRect(0,0,w,h);c.fillStyle='rgba(231,213,191,.75)';[14,w-14].forEach(x=>c.fillRect(x-1.5,0,3,h));[24,w-24].forEach(x=>c.fillRect(x-.5,0,1,h))},
 head(c,l,T,k){c.fillStyle=k.ink;c.textBaseline='middle';c.font='700 20px '+FONT.sans;sp(c,(T.s||'photobooth').toUpperCase(),l.W/2,90,7)},
 foot(c,l,T,k){const end=fend(l),cy=end+(l.H-end)/2,z=fit(c,T.t,u=>'400 '+u+'px '+FONT.scr,96,l.W-130);c.fillStyle=k.ink;c.textBaseline='middle';c.textAlign='center';c.font='400 '+z+'px '+FONT.scr;c.fillText(T.t,l.W/2,cy)}},
{id:'krem',name:'Krem Polos',ink:'#5A4636',fr:{p:10,r:0},paint(c,w,h){c.fillStyle='#F3EADB';c.fillRect(0,0,w,h)}},
{id:'kraft',name:'Kraft',ink:'#3A2614',fr:{p:10,r:0,tape:'rgba(250,236,170,.85)'},paint(c,w,h){c.fillStyle='#C8A57B';c.fillRect(0,0,w,h);c.fillStyle='rgba(80,50,20,.13)';for(let i=0;i<500;i++)c.fillRect((i*7919)%w,(i*4507)%h,2,2)}},
{id:'film',name:'Roll Film',ink:'#E8E2D0',fr:{p:10,r:0,c:'#0d0c0b'},paint(c,w,h){c.fillStyle='#171616';c.fillRect(0,0,w,h);c.fillStyle='#EDE7D6';for(let y=14;y<h;y+=52){c.fillRect(12,y,16,26);c.fillRect(w-28,y,16,26)}}},
{id:'batik',name:'Batik Kawung',ink:'#EBD6AA',fr:{p:12,r:0,c:'#EBD6AA'},paint(c,w,h){c.fillStyle='#4A2E1B';c.fillRect(0,0,w,h);c.strokeStyle='rgba(236,214,170,.5)';c.lineWidth=3;for(let y=0;y<h+70;y+=72)for(let x=0;x<w+70;x+=72)for(let k=0;k<4;k++){const a=k*Math.PI/2;c.beginPath();c.ellipse(x+Math.cos(a)*17,y+Math.sin(a)*17,22,9,a,0,7);c.stroke()}}},
{id:'lebaran',name:'Lebaran',ink:'#E9D391',fr:{p:10,r:0,c:'#E9D391'},paint(c,w,h){c.fillStyle='#0F4D3B';c.fillRect(0,0,w,h);for(let i=0;i<16;i++){const x=(i*4127)%w,y=(i*2879)%h;c.fillStyle='rgba(233,211,145,.8)';c.beginPath();c.arc(x,y,24,0,7);c.fill();c.fillStyle='#0F4D3B';c.beginPath();c.arc(x+9,y-6,21,0,7);c.fill()}c.fillStyle='rgba(233,211,145,.75)';for(let i=0;i<14;i++)sparkle(c,(i*3301)%w,(i*5113)%h,11+(i%3)*6)}},
{id:'merah',name:'Merah Putih',ink:'#B3131F',hink:'#fff',fr:{p:10,r:0},paint(c,w,h){c.fillStyle='#fff';c.fillRect(0,0,w,h);c.fillStyle='#CC2431';c.fillRect(0,0,w,h/2)}},
{id:'airmail',name:'Airmail',ink:'#2F2A24',fr:{p:12,r:0},paint(c,w,h){c.fillStyle='#F5F0E6';c.fillRect(0,0,w,h);c.save();c.beginPath();c.rect(0,0,w,h);c.rect(18,18,w-36,h-36);c.clip('evenodd');for(let i=-h,k=0;i<w+h;i+=30,k++){c.fillStyle=k%3===0?'#C43D3D':k%3===1?'#F5F0E6':'#2F5D9E';c.beginPath();c.moveTo(i,0);c.lineTo(i+30,0);c.lineTo(i+30+h,h);c.lineTo(i+h,h);c.fill()}c.restore()}},
{id:'rose',name:'Dusty Rose',ink:'#7A3B45',fr:{p:12,r:20,tape:'rgba(255,255,255,.7)',bow:1},paint(c,w,h){c.fillStyle='#E9C9C9';c.fillRect(0,0,w,h);c.fillStyle='rgba(255,255,255,.55)';for(let y=22;y<h;y+=44)for(let x=22+((y/44)%2)*22;x<w;x+=44){c.beginPath();c.arc(x,y,5,0,7);c.fill()}}}
];
export const FILTERS:any[]=[
{n:'Asli',f:'none'},
{n:'Kodak 200',f:'sepia(.18) saturate(1.05) contrast(1.04)',t:'rgba(255,176,96,.16)',lift:'#2A2420',g:.22,v:.18},
{n:'Fuji 400',f:'saturate(.92) contrast(1.05) hue-rotate(-4deg)',t:'rgba(90,170,150,.14)',lift:'#242826',g:.26,v:.15},
{n:'Tri-X',f:'grayscale(1) contrast(1.2)',g:.35,v:.3},
{n:'Golden Hour',f:'saturate(1.1) brightness(1.04)',t:'rgba(255,150,70,.22)',v:.12},
{n:'Fade 90an',f:'contrast(.9) saturate(.8) brightness(1.05)',lift:'#3A3632',g:.2,v:.1}];
export const S:any={sheet:true,items:[],sel:-1,layout:'strip4',bg:'tiket',filter:1,timer:3,facing:'user',shots:[],cap:'Photobooth',sub:'',pc:0};
export const L=()=>LAYOUTS[S.layout];export const B=()=>BGS.find((b:any)=>b.id===S.bg);
export const PAL=['#C44A14','#1C1713','#E9B44C','#3E7C59','#ffffff'];

function rr(c,x,y,w,h,r){c.beginPath();c.moveTo(x+r,y);c.arcTo(x+w,y,x+w,y+h,r);c.arcTo(x+w,y+h,x,y+h,r);c.arcTo(x,y+h,x,y,r);c.arcTo(x,y,x+w,y,r);c.closePath()}
export function glyph(c,n,s,col){c.fillStyle=col;c.beginPath();
 if(n==='heart'){const k=s/2;c.moveTo(0,k*.7);c.bezierCurveTo(-k*1.3,-k*.2,-k*.7,-k*1.1,0,-k*.5);c.bezierCurveTo(k*.7,-k*1.1,k*1.3,-k*.2,0,k*.7)}
 else if(n==='star'){for(let i=0;i<16;i++){const r=i%2?s*.33:s*.5,a=i*Math.PI/8;c.lineTo(Math.sin(a)*r,-Math.cos(a)*r)}c.closePath()}
 else if(n==='sparkle'){const r=s/2;c.moveTo(0,-r);c.quadraticCurveTo(0,0,r,0);c.quadraticCurveTo(0,0,0,r);c.quadraticCurveTo(0,0,-r,0);c.quadraticCurveTo(0,0,0,-r)}
 else{for(let i=0;i<6;i++){const px=Math.sin(i*1.047)*s*.27,py=-Math.cos(i*1.047)*s*.27;c.moveTo(px+s*.2,py);c.arc(px,py,s*.2,0,7)}}
 c.fill();if(n==='flower'){c.fillStyle=col==='#ffffff'?'#E9B44C':'#fff';c.beginPath();c.arc(0,0,s*.1,0,7);c.fill()}}
function drawItems(c,ui){S.items.forEach((it,i)=>{c.save();c.translate(it.x,it.y);c.rotate(it.r||0);c.textAlign='center';c.textBaseline='middle';let w=it.s,h=it.s;
 if(it.k==='g')glyph(c,it.v,it.s,it.col);
 else if(it.k==='tag'){c.font='700 '+it.s*.5+'px "DM Sans",sans-serif';w=c.measureText(it.v).width+it.s*.8;h=it.s*.8;c.fillStyle=it.col;rr(c,-w/2,-h/2,w,h,h/2);c.fill();c.fillStyle=(it.col==='#ffffff'||it.col==='#E9B44C')?'#1C1713':'#fff';c.fillText(it.v,0,2)}
 else{c.font='italic 400 '+it.s+'px "Instrument Serif",Georgia,serif';w=c.measureText(it.v).width;h=it.s;c.lineJoin='round';c.lineWidth=it.s/6;c.strokeStyle='#fff';c.strokeText(it.v,0,0);c.fillStyle='#1C1713';c.fillText(it.v,0,0)}
 it.w=w;it.h=h;if(ui&&i===S.sel){c.strokeStyle='#C44A14';c.lineWidth=4;c.setLineDash([12,9]);c.strokeRect(-w/2-10,-h/2-10,w+20,h+20)}c.restore()})}
function bow(c,x,y){c.save();c.translate(x,y);c.rotate(-.3);c.fillStyle='#C9707A';[-1,1].forEach(d=>{c.beginPath();c.moveTo(0,0);c.bezierCurveTo(d*34,-30,d*58,-10,d*50,8);c.bezierCurveTo(d*58,26,d*34,26,0,0);c.fill()});c.fillStyle='#A9525C';c.beginPath();c.arc(0,0,9,0,7);c.fill();c.restore()}
export function render(cv:any,shots:any,ui?:any,tpl?:any,noItems?:any){
 const l=L(),bg=tpl||B(),T={t:(S.cap||'').trim()||'Photobooth',s:(S.sub||'').trim(),d:new Date()};
 cv.width=l.W;cv.height=l.H;const c=cv.getContext('2d');bg.paint(c,l.W,l.H);(bg.head||dHead)(c,l,T,bg);
 for(let i=0;i<l.n;i++){const [x,y,w,h]=l.cells(i),f=bg.fr||{p:10,r:0};
  c.save();c.shadowColor='rgba(0,0,0,.22)';c.shadowBlur=14;c.shadowOffsetY=5;c.fillStyle=f.c||'#fff';rr(c,x-f.p,y-f.p,w+2*f.p,h+2*f.p,f.r?f.r+f.p/2:0);c.fill();c.restore();
  c.save();rr(c,x,y,w,h,f.r);c.clip();
  if(shots[i])c.drawImage(shots[i],x,y,w,h);else{c.fillStyle='#EDE6DA';c.fillRect(x,y,w,h);c.fillStyle='rgba(28,23,19,.3)';c.font='italic 400 110px '+FONT.ser;c.textAlign='center';c.textBaseline='middle';c.fillText(i+1,x+w/2,y+h/2)}
  c.restore();
  if(f.tape){c.save();c.translate(x+w/2,y-f.p);c.rotate(i%2?.05:-.05);c.fillStyle=f.tape;c.fillRect(-60,-16,120,32);c.restore()}
  if(f.bow&&i===0)bow(c,x+34,y-4)}
 (bg.foot||dFoot)(c,l,T,bg);
 if(!noItems)drawItems(c,ui)}
let NZc:any=null;const NZ=()=>NZc||(NZc=(()=>{const k=document.createElement('canvas');k.width=k.height=128;const c=k.getContext('2d'),d=c.createImageData(128,128);for(let i=0;i<d.data.length;i+=4){d.data[i]=d.data[i+1]=d.data[i+2]=Math.random()*255;d.data[i+3]=255}c.putImageData(d,0,0);return k})());
function fx(c,w,h,o){c.filter='none';c.setTransform(1,0,0,1,0,0);
 if(o.lift){c.globalCompositeOperation='lighten';c.fillStyle=o.lift;c.fillRect(0,0,w,h)}
 if(o.t){c.globalCompositeOperation='soft-light';c.fillStyle=o.t;c.fillRect(0,0,w,h)}
 if(o.g){c.globalCompositeOperation='overlay';c.globalAlpha=o.g;c.fillStyle=c.createPattern(NZ(),'repeat');c.fillRect(0,0,w,h);c.globalAlpha=1}
 if(o.v){const g=c.createRadialGradient(w/2,h/2,w*.32,w/2,h/2,w*.82);g.addColorStop(0,'rgba(0,0,0,0)');g.addColorStop(1,'rgba(0,0,0,'+o.v+')');c.globalCompositeOperation='source-over';c.fillStyle=g;c.fillRect(0,0,w,h)}
 c.globalCompositeOperation='source-over'}
export function toCell(src,vw,vh,mirror){
 const [,,w,h]=L().cells(0),k=document.createElement('canvas');k.width=w;k.height=h;const c=k.getContext('2d'),ar=w/h;
 let sw=vw,sh=vw/ar;if(sh>vh){sh=vh;sw=vh*ar}
 c.filter=FILTERS[S.filter].f;if(mirror){c.translate(w,0);c.scale(-1,1)}
 c.drawImage(src,(vw-sw)/2,(vh-sh)/2,sw,sh,0,0,w,h);fx(c,w,h,FILTERS[S.filter]);return k}

export function exp(){const l=L(),k=document.createElement('canvas');render(k,S.shots,false);if(!S.sheet||l.W>700||l.n<2)return k;const s=document.createElement('canvas');s.width=l.W*2;s.height=l.H;const c=s.getContext('2d');c.drawImage(k,0,0);c.drawImage(k,l.W,0);return s}
