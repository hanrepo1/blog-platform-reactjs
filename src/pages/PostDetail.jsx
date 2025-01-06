import React from 'react'
import PostAuthor from '../components/PostAuthor'
import { Link } from 'react-router-dom'
import Thumbnail from '../images/blog22.jpg'

const PostDetail = () => {
  return (
    <section className="post-detail">
      <div className="container post-detail__container">
        <div className="post-detail__header">
          <PostAuthor/>
          <div className="post-detail__buttons">
            <Link to={'/posts/werwer/edit'} className='btn sm primary'>Edit</Link>
            <Link to={'/posts/werwer/delete'} className='btn sm danger'>Delete</Link>
          </div>
        </div>
        <h1>This is the post title!</h1>
        <div className="post-detail__thumbnail">
          <img src={Thumbnail} alt="" />
        </div>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Modi, et veniam doloremque necessitatibus delectus est inventore maxime. Commodi doloremque porro aliquid repudiandae illo facilis rerum, maxime quia praesentium eligendi autem rem omnis provident animi ab aperiam, tempora ipsam ea sapiente?
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi accusamus cupiditate, eum harum amet doloribus in inventore beatae totam ad cumque tempore impedit. Maxime animi voluptatibus dolor commodi corporis, fugit alias autem sed beatae doloremque iste molestiae quasi recusandae accusantium hic? Eaque molestiae, officiis, asperiores magnam omnis voluptate possimus facilis sequi animi ipsam, doloribus mollitia!
        </p>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Magnam dicta dolore at nostrum praesentium recusandae nesciunt, autem quis consequuntur architecto et aspernatur aut minus! Voluptates, veritatis odit! Minus perferendis voluptatem non quos culpa nesciunt eveniet enim fugiat adipisci facere quod dolorem, vel sapiente repudiandae libero aliquam at doloribus nobis veritatis quam numquam iure porro repellat velit! Illum minus eum quisquam quo nobis nihil distinctio temporibus quasi, mollitia, autem possimus fugit eius libero! Mollitia laudantium unde odio corrupti repudiandae libero error consectetur sed. Accusantium, exercitationem quasi. Est vel velit cupiditate sapiente ut minima temporibus repellat quas numquam a porro minus voluptatibus officiis vitae atque aliquid distinctio voluptatum dolorem, omnis iste quisquam aperiam!
        </p>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Accusantium temporibus neque accusamus repellendus a magnam asperiores, odio nesciunt ipsum dignissimos?
        </p>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolor deserunt sit cupiditate? Maxime assumenda blanditiis provident unde harum, quia quas rem accusantium, pariatur sint numquam ullam voluptatibus dignissimos totam, corrupti cupiditate. Inventore praesentium veritatis distinctio fugiat, laudantium illum ratione debitis ullam quasi harum aut architecto laboriosam, cumque voluptatem eveniet illo quia voluptas ad mollitia, optio fugit quis quod dolorem modi? Explicabo molestias nam harum ea sapiente nemo dicta aperiam fugit voluptatibus voluptate, eos maxime cumque reprehenderit. Sequi, rem illum? Cumque tempora aut quo pariatur expedita aperiam temporibus quas! Sapiente necessitatibus dignissimos laudantium amet repellendus doloribus qui eaque iusto! Placeat ad delectus officia porro, cum velit quis minima ut blanditiis deserunt alias sit rem, quas quod accusamus reprehenderit et voluptas nostrum eum dolor dolorum ipsam corrupti! Aperiam quaerat expedita maxime corrupti adipisci consequuntur, harum cumque quia explicabo cum quod? In, eveniet! Nisi nihil delectus, obcaecati iure officiis enim aliquid nam? Illo, iusto. Ea molestias laborum perferendis dicta consequatur necessitatibus exercitationem pariatur? Saepe sint illum, eos fugit, soluta maxime adipisci nisi voluptatem nulla ipsa nesciunt accusantium voluptas id quod dolorum nam rem. Minima tenetur repudiandae, ipsum doloremque rem dolore ab aliquid commodi non quisquam laborum officiis alias enim, qui nobis quaerat blanditiis?
        </p>
      </div>
    </section>
  )
}

export default PostDetail