"use client"
import { Typewriter } from 'react-simple-typewriter'

export default function HeroText(){
  const texts = [
    <>Have you <span className='text-green-500'>solved</span> a problem today?</>,
    <>Did you get an <span className='text-green-500'>AC</span> today?</>,
    <>Did you get a <span className='text-yellow-500'>PA</span> today?</>,
    <>Did you get a <span className='text-orange-500'>TLE</span> today?</>,
    <>Have you <span className='text-orange-500'>time limit exceeded</span> a problem today?</>,
    <>Did you get a <span className='text-red-500'>WA</span> today?</>,
  ];

  return texts[Math.floor(Math.random() * texts.length)]
  {/* <Typewriter words={['Have you solved a problem today?']} loop cursor cursorBlinking/> */}
}