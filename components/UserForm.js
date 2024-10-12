// src/components/UserForm.js
import React, { useState } from 'react';
import { db, storage } from '../firebase';
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import './UserForm.css';

const UserForm = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [handle, setHandle] = useState('');
  const [images, setImages] = useState([]);

  const handleFileChange = (e) => {
    setImages(e.target.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    try {
      // Create a user document
      const docRef = await addDoc(collection(db, 'users'), {
        name,
        handle,
      });

      const imageUrls = [];
      for (let i = 0; i < images.length; i++) {
        const imageRef = ref(storage, `images/${docRef.id}/${images[i].name}`);
        await uploadBytes(imageRef, images[i]);
        const url = await getDownloadURL(imageRef);
        imageUrls.push(url);
      }

      // Update the user document with image URLs
      await addDoc(collection(db, 'userImages'), {
        userId: docRef.id,
        images: imageUrls,
      });

      onSubmit(); // Navigate to the success page
      // Reset form fields
      setName('');
      setHandle('');
      setImages([]);
    } catch (err) {
      console.error('Error submitting data', err);
      alert('Error submitting data. Please try again.');
    }
  };

  return (
    <form className="user-form" onSubmit={handleSubmit}>
      <h2>User Submission Form</h2>
      <div>
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Social Media Handle:</label>
        <input
          type="text"
          value={handle}
          onChange={(e) => setHandle(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Upload Images:</label>
        <input type="file" multiple onChange={handleFileChange} />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default UserForm;
