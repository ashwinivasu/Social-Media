// src/components/AdminDashboard.js
import React, { useEffect, useState } from 'react';
import { db } from '../firebase'; // Firebase setup
import { collection, getDocs } from 'firebase/firestore';
import './AdminDashboard.css'; // Import the CSS file for AdminDashboard

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);

  const fetchData = async () => {
    const usersSnapshot = await getDocs(collection(db, 'users'));
    const userImagesSnapshot = await getDocs(collection(db, 'userImages'));

    const usersData = usersSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    const imagesData = userImagesSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    // Merge images data with users data
    const usersWithImages = usersData.map(user => {
      const userImages = imagesData.find(image => image.userId === user.id);
      return {
        ...user,
        images: userImages ? userImages.images : [], // Ensure the images field is present
      };
    });

    console.log(usersWithImages); // Check the merged data in console
    setUsers(usersWithImages);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="admin-dashboard">
      <h2>User Submissions</h2>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            <h3>{user.name} (@{user.handle})</h3>
            <div>
              {user.images.length > 0 ? (
                user.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`user-upload-${index}`}
                    className="thumbnail"
                  />
                ))
              ) : (
                <p>No images uploaded</p>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;
