import { useState } from "react"


export function TwitterFollowCard({children,formatUserName,userName,name,initialIsFollowing,numbers}){
    const [isFolloing, setIsFollowing]= useState(initialIsFollowing)
    const pic="src\\assets\\images.jpg"
    const avat=`https://unavatar.io/${userName}`
    const tex= isFolloing ? 'Siguiendo' : 'Seguir'
    const buttonClassName= isFollowing
    ? 'tw-followCard-button is-following'
    : 'tw-followCard-button'
    const handleClick=()=>{
        setIsFollowing(!isFollowing)
    }
    return(
        <article className='tw-followCard'>
        <header className='tw-followCard-header'>
        <img className='tw-followCard-avatar'
        alt="" src={avat}></img>
        <div className='tw-followCard-info'>
        <strong>{name}</strong>
        <span className='tw-followCard-infoUserName'>{formatUserName(userName)}</span>
        </div>
        </header>
        <aside>
            < button className={buttonClassName} onClick={handleClick}>
        {tex}
            </button>
        </aside>
    </article>
    )
}