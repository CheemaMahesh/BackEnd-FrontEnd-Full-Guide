import React, { useState,useRef,useEffect ,useReducer} from "react";


function blogReducer(state,action){
switch(action.type){
  case "ADD":
    return [action.blog,...state]
    case "REMOVE":
      return state.filter((blog,index)=>index!==action.index)
      default:
        return[]

}
}

export default function Blog() {
  // let [title, setTitle] = useState("");
  // let [content, setContent] = useState("");
  let [formData,setFormData]=useState({title:"",content:""})
  // const [blogs,setBlogs]=useState([]);
  const [blogs,dispatch]=useReducer(blogReducer,[]);
  const titleRef=useRef(null);

  useEffect(()=>{
    titleRef.current.focus();
  },[]);
  useEffect(()=>{
    if(blogs.length&&blogs[0].title){
      document.title=blogs[0].title
    }else{
      document.title="No Blogs"
    }
  },[blogs])

  const handleSubmit = (e) => {
    e.preventDefault();
    // setBlogs.push({title,content});       This won't work.
    // setBlogs([{title:formData.title,content:formData.content},...blogs]);
    dispatch({type:"ADD",blog:{title:formData.title,content:formData.content}})
    console.log(blogs);
    setFormData({title:"",content:""});
   
    
   

  };
  const handleDelete=(i)=>{
    console.log("handleDelete",i);
    // const updatedBlogs = blogs.filter((_, i) => i !== index);
    // setBlogs(updatedBlogs);

    // setBlogs(blogs.filter((blog,i)=>index!==i));
    dispatch({type:"REMOVE",index:i})
  }

  return (
    <div className="head">
      <h1>Write a Blog!</h1>
      <div className="body">
        <form onSubmit={handleSubmit}>
          <label htmlFor="name" className="l">
            Name
          </label>
          <input
            type="text"
            id="name"
            placeholder="Enter the title here...."
            value={formData.title}
            ref={titleRef}
            onChange={(e) => {
              setFormData({title:e.target.value,content:formData.content});
            }}
            required
          />

          <label htmlFor="content" className="l">
            Content
          </label>
          <textarea
            id="content"
            placeholder="Content goes here......."
            value={formData.content}
            onChange={(e) => {
              setFormData({title:formData.title,content:e.target.value});
            }}
            required
           
          />

          <button type="submit">ADD</button>
        </form>
      </div>
      <h1>Blogs</h1>
      <div className="Blog">
       {blogs.map((data,i)=>{
       return <div key={i} className="Blog-C">
        <h4 >{data.title}</h4>
        <p>{data.content}</p>
        <button value={i} onClick={(e)=>{handleDelete(i)}}>delete</button>
        <br/>
        
       </div>
       })}
      </div>
    </div>
  );
}
