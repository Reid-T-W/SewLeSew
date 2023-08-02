import React, { createContext, useContext, useState } from 'react'; 

export const DynamicContext = createContext(null);

export function useDynamic() {
    return useContext(DynamicContext);
}

export const DynamicContextProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(sessionStorage.getItem('isLoggedIn') ? sessionStorage.getItem('isLoggedIn') : false);
    const sessionTokenFromSessionStorage = sessionStorage.getItem('sessionToken')
    const [sessionToken, setSessionToken] = useState(sessionTokenFromSessionStorage? sessionTokenFromSessionStorage : '');
    const pendingdonationsCountFromSessionStorage = sessionStorage.getItem('pendingdonationsCount')
    const [pendingdonationsCount, setPendingdonationsCount] = useState(pendingdonationsCountFromSessionStorage? JSON.parse(pendingdonationsCountFromSessionStorage):0);
    const [notificationsCount, setNotificationsCount] = useState(0);
    const [unreadCount, setUnreadCount] = useState(0);

    const emailFromSessionStorage = sessionStorage.getItem('email')
    const [email, setEmail] = useState(emailFromSessionStorage? emailFromSessionStorage : '');
    
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const usernameFromSessionStorage = sessionStorage.getItem('username');
    const [username, setUsername] = useState(usernameFromSessionStorage? usernameFromSessionStorage : '');

    const firstNameFromSessionStorage = sessionStorage.getItem('firstName');
    const [firstName, setFirstName] = useState(firstNameFromSessionStorage? firstNameFromSessionStorage : '');
    
    const lastNameFromSessionStorage = sessionStorage.getItem('lastName');
    const [lastName, setLastName] = useState(lastNameFromSessionStorage? lastNameFromSessionStorage : '');
    
    const [profilePic, setProfilePic] = useState('');
    
    const [role, setRole] = useState('User');
    const [searchTerm, setSearchTerm] = useState('');
    const [files, setFiles] = useState([]);
    const [videoFiles, setVideoFiles] = useState([]);

    // Posts
    const postsFromSessionStorage = sessionStorage.getItem('posts')
    // const [posts, setPosts] = useState(sessionStorage.getItem('posts') ? sessionStorage.getItem('posts') : []);
    const [posts, setPosts] = useState( postsFromSessionStorage? JSON.parse(postsFromSessionStorage) : []);

    // PostDetails
    const postDetailsFromSessionStorage = sessionStorage.getItem('postDetails')
    const [postDetails, setPostDetails] = useState(postDetailsFromSessionStorage? JSON.parse(postDetailsFromSessionStorage):[]);

    // User
    const userDonationsFromSessionStorage = sessionStorage.getItem('userDonations')
    const userPendingDonationsFromSessionStorage = sessionStorage.getItem('userPendingDonations')
    const userPostsFromSessionStorage = sessionStorage.getItem('userPosts')
    const [userDonations, setUserDonations] = useState( userDonationsFromSessionStorage? JSON.parse(userDonationsFromSessionStorage) : []);
    const [userPendingDonations, setUserPendingDonations] = useState( userPendingDonationsFromSessionStorage? JSON.parse(userPendingDonationsFromSessionStorage) : []);
    const [userPosts, setUserPosts] = useState( userPostsFromSessionStorage? JSON.parse(userPostsFromSessionStorage) : []);
    // New Post
    const [titleNewPost, setTitleNewPost] = useState('');
    const [descriptionNewPost, setDescriptionNewPost] = useState('');
    const [amountNewPost, setAmountNewPost] = useState(0);
    const [locationNewPost, setLocationNewPost] = useState('');
    const [categoryNewPost, setCategoryNewPost] = useState('');
    const [imageNewPost, setImageNewPost] = useState('');
    const [videoNewPost, setVideoNewPost] = useState('');
    const [documentNewPost, setDocumentNewPost] = useState('');
    const [doners, setDoners] = useState([]);
    const [pendingDonationCounter, setPendingDonationCounter] = useState(0);
    
    const resetUnreadCount = () => {
        setUnreadCount(0);
    }

    const resetNotificationsCount = () => {
        setNotificationsCount(0);
    }

    const resetPendingdonationsCount = () => {
        setPendingdonationsCount(0);
    }

    const incrementNotificationsCount = () => {
        setNotificationsCount( notificationsCount + 1 );

    }
    const incrementPendingdonationsCount = () => {
        setPendingdonationsCount( pendingdonationsCount + 1 );
    }

    const value = {
        isLoggedIn,
        setIsLoggedIn,
        sessionToken,
        setSessionToken,
        pendingdonationsCount, 
        setPendingdonationsCount,
        resetPendingdonationsCount,
        notificationsCount,
        resetNotificationsCount,
        setNotificationsCount,
        unreadCount,
        resetUnreadCount,
        incrementPendingdonationsCount,
        incrementNotificationsCount,
        email,
        setEmail,
        password,
        setPassword,
        confirmPassword,
        setConfirmPassword,
        username,
        setUsername,
        firstName,
        setFirstName,
        lastName,
        setLastName,
        role,
        setRole,
        posts,
        setPosts,
        userDonations,
        setUserDonations,
        userPendingDonations,
        setUserPendingDonations,
        userPosts,
        setUserPosts,
        titleNewPost,
        setTitleNewPost,
        descriptionNewPost,
        setDescriptionNewPost,
        amountNewPost,
        setAmountNewPost,
        locationNewPost,
        setLocationNewPost,
        categoryNewPost,
        setCategoryNewPost,
        imageNewPost,
        setImageNewPost,
        videoNewPost,
        setVideoNewPost,
        documentNewPost,
        setDocumentNewPost,
        postDetails,
        setPostDetails,
        profilePic,
        setProfilePic,
        searchTerm,
        setSearchTerm,
        files,
        setFiles,
        videoFiles,
        setVideoFiles,
        doners,
        setDoners,
        pendingDonationCounter,
        setPendingDonationCounter,
    };
    
    return (
        <DynamicContext.Provider value={value}>
            {children}
        </DynamicContext.Provider>
    );
}