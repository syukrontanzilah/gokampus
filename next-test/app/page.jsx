import Link from "next/link";
import dynamic from "next/dynamic";

const HeaderComponent = dynamic(() => import('../components/Header'))

const fetchPosts = async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=10', {
      cache: 'force-cache',
  });
  if (!res.ok) {
      throw new Error('Failed to fetch');
  }
  return res.json();
};

const Home = async () => {
  const posts = await fetchPosts();
  return (
    <main className="bg-blue-200 min-h-screen">
      <div className="bg-white xl:w-[450px] min-h-screen mx-auto">
        <HeaderComponent title={'Blog Post'}/>
      <div className="p-4 pt-20">
            <ul>
                {posts.map(post => (
                  <Link key={post.id} href={`/detail/${post.id}`}>
                    <li 
                    className="shadow-lg p-4 rounded-xl hover:bg-slate-50 mb-3 transition-all"
                    >
                        <h2 className="font-bold mb-2 text-green-700 text-xl capitalize">{post.title}</h2>
                        <p>{post.body}</p>
                    </li>
                  </Link>
                ))}
            </ul>
        </div>
      </div>
    </main>
  );
}

export default Home;