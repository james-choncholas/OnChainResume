let SessionLoad = 1
if &cp | set nocp | endif
let s:so_save = &so | let s:siso_save = &siso | set so=0 siso=0
let v:this_session=expand("<sfile>:p")
silent only
cd ~/EthDev/Resume
if expand('%') == '' && !&modified && line('$') <= 1 && getline(1) == ''
  let s:wipebuf = bufnr('%')
endif
set shortmess=aoO
badd +26 app/index.html
badd +70 app/javascripts/app.js
badd +71 ~/EthDev/PetShop/src/js/app.js
badd +61 ~/EthDev/PetShop/src/index.html
badd +130 ~/EthDev/PetShop/src/pets.json
badd +1 contracts/Resume.sol
badd +287 ~/EthDev/PetShop/src/js/truffle-contract.js
badd +1 ~/EthDev/PetShop/src/js/bootstrap.min.js
badd +177 ~/EthDev/conference/app/javascripts/app.js
badd +36 ~/EthDev/conference/app/index.html
badd +12 ~/EthDev/conference/contracts/Conference.sol
badd +31 test/resume.js
argglobal
silent! argdel *
edit contracts/Resume.sol
set splitbelow splitright
set nosplitbelow
set nosplitright
wincmd t
set winheight=1 winwidth=1
argglobal
setlocal fdm=manual
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=0
setlocal fml=1
setlocal fdn=20
setlocal fen
silent! normal! zE
let s:l = 13 - ((12 * winheight(0) + 26) / 53)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
13
normal! 0
tabnext 1
if exists('s:wipebuf')
  silent exe 'bwipe ' . s:wipebuf
endif
unlet! s:wipebuf
set winheight=1 winwidth=20 shortmess=filnxtToO
let s:sx = expand("<sfile>:p:r")."x.vim"
if file_readable(s:sx)
  exe "source " . fnameescape(s:sx)
endif
let &so = s:so_save | let &siso = s:siso_save
let g:this_session = v:this_session
let g:this_obsession = v:this_session
let g:this_obsession_status = 2
doautoall SessionLoadPost
unlet SessionLoad
" vim: set ft=vim :
