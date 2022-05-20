import React from "react"

const Home=()=>
{
    return <div className="Home">
        <div className="ImageBox">
            <div className="BannerFade"></div>
            <img id="BannerImage" src="./files/BannerBackground.png"></img>
        </div>
        <div className="HomeContent">
            <h1>Gregory Mah Portfolio</h1>
            <h2>Welcome to my website</h2>
            <p id="MainText">
                This is where I will post projects.
                Last updated: 5/20/22    
                <img id="ProfileImage" src="./files/Profile.jpg"></img>
            </p>
            

            <a target="_blank" href="./files/Gregory Mah Resume.pdf">
                <div className="Button">
                    Resume
                </div>
            </a>

            <h2>Book website project</h2>
            <p>
                Created a book website as a freelance developer for a book.
            </p>
            <div className="ButtonBox">
                <a target="_blank" href="https://fantastic-mooncake-da3220.netlify.app/">
                    <div className="Button">
                        Mockup Website
                    </div>
                </a>
                <a target="_blank" href="https://www.billtsumd.com/">
                    <div className="Button">
                        Final Squarespace Website
                    </div>
                </a>
            </div>

        </div>
    </div>
}

export default Home;