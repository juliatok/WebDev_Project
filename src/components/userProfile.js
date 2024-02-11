import '../App.css'; 

function UserProfile() {
  return (
    <div className='container'>
      <div className="profile-picture">
        <img src="https://via.placeholder.com/100" alt="Profile"/>
        <div class="info">
            <h1>Name</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dignissimos delectus reiciendis dolorum sit quis voluptas incidunt repellat. Minus vitae cum ab repellendus doloribus, omnis iusto consequatur placeat tempora consectetur doloremque. </p>
            </div>
        </div>
        <div class="container2">
            <div className="buttons">
                <div>
                    <button className="share">Share</button>
                </div>
                <div>
                    <button className="follow-profile">Follow</button>
                </div>
            </div>
            <div class="posts">
                <div class="post">
                    <h2>Post1</h2>   
                </div>
                <div class="post">
                    <h2>Post2</h2>
                </div>
                <div class="post">
                    <h2>Post3</h2>
    
                </div>
                <div class="post">
                    <h2>Post4</h2>
    
                </div>
                <div class="post">
                    <h2>Post5</h2>
    
                </div>
                <div class="post">
                    <h2>Post6</h2>
    
                </div>
                <div class="post">
                    <h2>Post7</h2>
    
                </div>
                <div class="post">
                    <h2>Post8</h2>
    
                </div>
                <div class="post">
                    <h2>Post9</h2>
    
                </div>
                <div class="post">
                    <h2>Post10</h2>
    
                </div>
            </div>
        </div>
    </div>
  );
}

export default UserProfile;