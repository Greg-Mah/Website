import React from "react"

const Home=()=>
{
    return <div className="Home">
        <div className="ImageBox">
            <div className="BannerFade"></div>
            <img id="BannerImage" src="./files/BannerBackground.png"></img>
        </div>
        <h1>Gregory Mah Portfolio</h1>
        <h2>Welcome to my website</h2>
        <p>
            This is where I will post projects.
            Last updated: 4/21/22
            <img id="ProfileImage" src="./files/Profile.jpg"></img>
        </p>
        

        <a target="_blank" href="./files/Gregory Mah Resume.docx.pdf">
            <div className="Button">
                Resume
            </div>
        </a>
    </div>
}

export default Home;