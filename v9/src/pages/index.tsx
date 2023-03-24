import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { useEffect, useState } from 'react'
import { AppProps } from 'next/app';
import { PostModel } from './models/post.model'
import Link from 'next/link'

// const inter = Inter({ subsets: ['latin'] })

export default function Home({ posts, date }: { posts: [PostModel], date: Date}) {
  // Without getStaticProps load in front
  // let [posts, setPosts] = useState([])

  // useEffect(() => {
  //   const data = fetch('https://jsonplaceholder.typicode.com/posts?_limit=4')
  //     .then(r => r.json())
  //     .then(setPosts)
  // }, [])

  const [count, setCount] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => setCount(n => n + 1), 1000)
    return () => {
      clearInterval(timer)
    }
  }, [])

  return (
    <>
      <Head>
        <title>Sandbox Next</title>
      </Head>
      <h1>Timer : {count} - {date}</h1>
      <ul>
        {posts.map(post => <li key={post.id}>
          <Link href={`/blog/${post.id}`}>
              <h3>{post.id} : {post.title}</h3>
          </Link>
        </li>)}
      </ul>
    </>
  )
}

// Load before show not in front name : getStaticProps
// Serveur side rendering : getServerSideProps
// Dual mode, add date for exemple, date 
// ISR > revalidate each X seconds with getStaticProps
export async function getStaticProps() {
  const posts = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=4')
    .then(r => r.json())
  
  return {
    props: {
      posts,
      date: (new Date()).toString()
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 10 seconds
    revalidate: 5, // In seconds
  }
}
