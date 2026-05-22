import{ay as o}from"./index-snmSg0-g.js";const n=(e,t=300)=>{const[r,s]=o.useState(e);return o.useEffect(()=>{const c=setTimeout(()=>s(e),t);return()=>clearTimeout(c)},[e,t]),r};export{n as u};
