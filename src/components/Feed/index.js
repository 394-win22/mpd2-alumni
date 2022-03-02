import { useContext, useState } from "react";
import PostList from "./PostsList";
import { UserContext } from "components/LoggedIn";
import SearchBar from "components/SearchBar";



const Main = () => {
  const [query, setQuery] = useState("");
  const context = useContext(UserContext);
  const [phaseFilter, setPhaseFilter] = useState([]);
  const [teamFilter, setTeamFilter] = useState([]);
  let filteredPosts = context.postList;

  function filtering(e){
    let x = true;
    if (!(e.tags)&& phaseFilter.length > 0 || !(((context.userList.filter((u)=> u.uid === e.author))[0]).teamId) && teamFilter.length>0 ){
      return false;
    }
    if(e.tags && phaseFilter.length > 0){
      x = x && e.tags.some((r) => phaseFilter.includes(r));
    }
    if(query) {
      x = x && e.description.toLowerCase().includes(query.toLowerCase());
    }
    if(((context.userList.filter((u)=> u.uid === e.author))[0]).teamId && teamFilter.length>0){
      x= x && teamFilter.includes(String(((context.userList.filter((u)=> u.uid === e.author))[0]).teamId));
    }
    return x;
    
  }

  if (query != "" || phaseFilter.length > 0 || teamFilter.length>0) {
    filteredPosts = context.postList.filter((e) => {
      //console.log(filtering(e));
      return (
        filtering(e)
      );
    });
    
  }


  return (
    <div className="App">
      <SearchBar
        setQuery={setQuery}
        setPhaseFilter={setPhaseFilter}
        setTeamFilter= {setTeamFilter}
        phaseFilter={phaseFilter}
        teamFilter= {teamFilter}
      />
      <PostList posts={filteredPosts} />
    </div>
  );
};

export default Main;
