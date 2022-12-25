import { useEffect } from "react";

const Scroll = (props) => {

    const {blogsList, updatePage} = props;    
    const blogs_container = document.getElementById('blogs');

    blogs_container && blogs_container.addEventListener('scroll', event => {
        const e = event.target;
        if (e.scrollHeight <= e.scrollTop + e.clientHeight + 1) {
            updatePage();
        }
    });

    return (
        <div id="blogs">
            {blogsList.length > 0 && blogsList.map((data) => {
                return (
                    <div key={Math.floor(Math.random())} className='card-container'>
                        <h2>User - {data.first_name} {data.last_name}</h2>
                        <img src={data.avatar} alt={data.last_name} className='avatar' />
                        <h4>Contact - {data.email}</h4>
                    </div>
                )
            })}
        </div>
    )
};

export default Scroll;