import './Home.css';
import { useState, useEffect, useContext } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import UserContext from "../UserContext";
import Scroll from './Scroll';

const Home = () => {

    const [blogsData, setBlogsData] = useState([]);
    const {setIsLogged} = useContext(UserContext);
    const history = useNavigate();
    const [page, setPage] = useState(1);

    const blogData = async() => {
        const resp = await axios.get(`https://reqres.in/api/users?page=${page}&per_page=4`);
        setBlogsData([...blogsData, ...resp.data.data]);
    };
    console.log(blogsData)
    const updatePage = () => {
        setPage(page => page+1);
    };

    useEffect(() => {
        page > 4 && setPage(Math.floor(Math.random() * 4) + 1)
        page < 5 && blogData();
    }, [page]);

    const handleLogout = () => {
        history('/login');
        setIsLogged(false);
    };

    return (
        <div className='home-container'>
            <AppBar position="static">
              <Toolbar>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Blogs
                </Typography>
                <Button color="inherit" onClick={handleLogout}>Logout</Button>
              </Toolbar>
            </AppBar>
            <h1 className="header-card">User Blogs</h1>
            <div className="blogs-container" id='blogs'>
                <div className='input-container'>
                    <Scroll blogsList={blogsData} updatePage={updatePage} key={Math.floor(Math.random())} />
                </div>
            </div>
        </div>
    )
};

export default Home;