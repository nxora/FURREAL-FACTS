import { useState } from 'react'
import './App.css'

function Footer() {

    return (
        <>
            <div className='flex justify-around h-[5em] items-center'>
                <div class="text-blue-400">
                    <h5><strong>All Rights Reserved &copy; <span>Nexora, 2025</span></strong></h5>
                    <h5><strong>Made with 💙 by<span> Nexora</span></strong></h5>
                </div>

                <div className='flex gap-12 font-bold text-[30px]'>
                    <a className='text-blue-800 ' href="https://www.facebook.com/davex.1011" target="_blank"><i class="fab fa-facebook"></i></a>
                    <a className='text-blue-800' href="https://www.github.com/nxora" target="_blank"><i class="fab fa-github"></i></a>
                    <a className='text-blue-800' href="https://www.snapchat.com/@davex.101" target="_blank"><i class="fab fa-snapchat"></i></a>
                </div>
            </div>
        </>
    )
}

export default Footer
