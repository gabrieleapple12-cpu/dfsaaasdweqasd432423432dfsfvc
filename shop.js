let cart=[]
const buttons=document.querySelectorAll('.buy-button')
const cartIcon=document.getElementById('cart-icon')
const cartCount=document.getElementById('cart-count')
const modal=document.getElementById('checkout-modal')
const closeButton=document.querySelector('.close-button')
const cartItemsDiv=document.getElementById('cart-items')
const cartTotal=document.getElementById('cart-total')
const checkoutForm=document.getElementById('checkout-form')
const adminLoginBtn=document.getElementById('admin-login-button')
const adminModal=document.getElementById('admin-modal')
const closeAdmin=document.querySelector('.close-admin')
const adminForm=document.getElementById('admin-form')
const messageBox=document.getElementById('message-box')

function showMessage(msg, type='info') {
  messageBox.textContent = msg
  messageBox.className = 'show ' + type
  messageBox.style.opacity = '1'
  messageBox.style.display = 'block'
  setTimeout(() => {
    messageBox.style.opacity = '0'
    setTimeout(() => {
      messageBox.style.display = 'none'
    }, 500)
  }, 4000)
}


buttons.forEach(button=>{
  button.addEventListener('click',()=>{
    const name=button.dataset.name
    const price=parseFloat(button.dataset.price)
    const existing=cart.find(item=>item.name===name)
    if(existing){ existing.quantity+=1 } else{ cart.push({name,price,quantity:1}) }
    updateCartIcon()
    showMessage(`${name} aggiunto al carrello!`, 'success')
  })
})

function updateCartIcon(){
  const totalItems=cart.reduce((sum,item)=>sum+item.quantity,0)
  cartCount.textContent=totalItems
}

cartIcon.addEventListener('click',()=>{
  updateCartModal()
  modal.style.display='flex'
})

closeButton.addEventListener('click',()=>{ modal.style.display='none' })
window.addEventListener('click',e=>{ if(e.target===modal){ modal.style.display='none' } })

function updateCartModal(){
  cartItemsDiv.innerHTML=''
  if(cart.length===0){ cartItemsDiv.innerHTML='<p>Il carrello è vuoto.</p>'; cartTotal.innerHTML='<strong>Totale: €0.00</strong>'; return }
  let total=0
  cart.forEach((item,index)=>{
    const div=document.createElement('div')
    div.classList.add('cart-item')
    div.innerHTML=`<span>${item.name} x${item.quantity} - €${(item.price*item.quantity).toFixed(2)}</span><button data-index="${index}">❌</button>`
    cartItemsDiv.appendChild(div)
    total+=item.price*item.quantity
  })
  cartTotal.innerHTML=`<strong>Totale: €${total.toFixed(2)}</strong>`
  cartItemsDiv.querySelectorAll('button').forEach(btn=>{
    btn.addEventListener('click',e=>{
      const index=e.target.dataset.index
      cart.splice(index,1)
      updateCartIcon()
      updateCartModal()
      showMessage('Prodotto rimosso dal carrello','info')
    })
  })
}

checkoutForm.addEventListener('submit',e=>{
  e.preventDefault()
  const zone=document.getElementById('zone').value
  const nome=document.getElementById('nome').value.trim()
  const cognome=document.getElementById('cognome').value.trim()
  const email=document.getElementById('email').value.trim()
  const insta=document.getElementById('instagram').value.trim()
  if(zone===''||nome===''||cognome===''||email===''||insta===''){ showMessage("Compila tutti i campi!",'error'); return }
  if(cart.length===0){ showMessage("Il carrello è vuoto!",'error'); return }

  let orders=JSON.parse(localStorage.getItem('orders')||'[]')
  const adminAccess = localStorage.getItem('adminAccess') === 'true'
orders.push({
  nome,
  cognome,
  email,
  instagram: insta,
  zone,
  cart,
  stato: 'In corso',
  userType: adminAccess ? 'admin' : 'user'
})

  localStorage.setItem('orders',JSON.stringify(orders))
  cart=[]
  updateCartIcon()
  updateCartModal()
  modal.style.display='none'
  checkoutForm.reset()
  showMessage("Ordine ricevuto! Verrai contattato su Instagram per completarlo",'success')
})

adminLoginBtn.addEventListener('click',()=>{ adminModal.style.display='flex' })
closeAdmin.addEventListener('click',()=>{ adminModal.style.display='none' })
window.addEventListener('click',e=>{ if(e.target===adminModal){ adminModal.style.display='none' } })

adminForm.addEventListener('submit',e=>{
  e.preventDefault()
  const user=document.getElementById('admin-user').value
  const pass=document.getElementById('admin-pass').value
  if(user==='AdminMG12' && pass==='Admin_12G.M'){ 
    localStorage.setItem('adminAccess','true')
    window.location.href='admin.html'
  } else { 
    showMessage("Credenziali errate!",'error')
    adminForm.reset()
  }
})
