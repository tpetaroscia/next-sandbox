import Link from "next/link"
import { PostModel } from "../models/post.model"

export default function Post({ post } : {post: PostModel}) {
    return (
        <>
            <main>
                <Link href='/'>Revenir à l'accueil</Link>
                <h1>{post.title}</h1>
                <p>{post.body}</p>
            </main>
        </>
    )
    
}

// Server side rendering, for dynamic data
export async function getServerSideProps({params}) {
    const post = await fetch(`https://jsonplaceholder.typicode.com/posts/${params.id}`)
    .then(r => r.json())
  
    return {
        props: {
            post
        }
    }
}

// For static
// Static page
// export async function getStaticProps({params}) {
//     const post = await fetch(`https://jsonplaceholder.typicode.com/posts/${params.id}`)
//     .then(r => r.json())
  
//   return {
//     props: {
//       post
//     }
//   }
// }

// For Static
// Only static need to build exist url
// export async function getStaticPaths() {
//     const posts = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=4')
//       .then(r => r.json())
    
//     return {
//         paths: posts.map(post => ({
//             params: { id: post.id.toString() }
//         })), fallback: false
//     }
//   }