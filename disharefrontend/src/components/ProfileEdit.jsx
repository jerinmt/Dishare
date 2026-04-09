import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserProfile, updateUserProfile, clearError, clearSuccess } from '../store/userSlice';
import { getErrorMessage, getMediaUrl, userService } from '../utils/apiClient';
import Navbar from './Navbar.jsx';
import Footer from './Footer.jsx';
import './ProfileEdit.css';

const ProfileEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser: user, loading, error, success } = useSelector((state) => state.user);
  const currentAuthUser = useSelector((state) => state.auth.user);

  const [form, setForm] = useState({
    username: '',
    bio: '',
    imageFile: null,
  });

  const [previewImage, setPreviewImage] = useState(null);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
  });
  const [passwordError, setPasswordError] = useState(null);
  const [passwordSuccess, setPasswordSuccess] = useState(null);
  const [passwordLoading, setPasswordLoading] = useState(false);

  // Fetch user profile on mount
  useEffect(() => {
    dispatch(fetchUserProfile(id));
  }, [id, dispatch]);

  // Pre-fill form when user is fetched
  useEffect(() => {
    if (user) {
      setForm({
        username: user.username || '',
        bio: user.bio || '',
        imageFile: null,
      });
      if (user.pic) {
        setPreviewImage(getMediaUrl(user.pic));
      }
    }
  }, [user]);

  // Redirect if not own profile
  useEffect(() => {
    if (currentAuthUser && currentAuthUser.id != id) {
      navigate('/');
    }
  }, [currentAuthUser, id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setForm((prev) => ({ ...prev, imageFile: file }));
      // Show preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePasswordFormChange = (e) => {
    const { name, value } = e.target;
    setPasswordForm((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setPasswordError(null);
    setPasswordSuccess(null);

    if (!passwordForm.currentPassword.trim() || !passwordForm.newPassword.trim()) {
      setPasswordError('Please fill in both password fields.');
      return;
    }

    setPasswordLoading(true);
    try {
      const response = await userService.changePassword(id, {
        currentPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword,
      });
      setPasswordSuccess(response.data?.message || 'Password changed successfully.');
      setPasswordForm({ currentPassword: '', newPassword: '' });
    } catch (error) {
      setPasswordError(getErrorMessage(error));
    } finally {
      setPasswordLoading(false);
    }
  };

  const togglePasswordForm = () => {
    setShowPasswordForm((prev) => !prev);
    setPasswordError(null);
    setPasswordSuccess(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(clearError());
    dispatch(clearSuccess());

    if (!form.username.trim()) {
      alert('Username is required');
      return;
    }

    // Create FormData for multipart/form-data
    const formData = new FormData();
    formData.append('username', form.username);
    formData.append('bio', form.bio);
    if (form.imageFile) {
      formData.append('profileImage', form.imageFile);
    }

    try {
      await dispatch(updateUserProfile({ userId: id, formData })).unwrap();
      // Success message is shown by Redux
      setTimeout(() => {
        navigate(`/profile/${id}`);
      }, 1500);
    } catch (err) {
      console.error('Failed to update profile:', err);
    }
  };

  return (
    <>
      <Navbar />
      <div className="profile-edit-page">
        <div className="profile-edit-container">
          <h2 className="page-title profile-edit-title">Edit Profile</h2>
          <p className="page-subtitle profile-edit-subtitle">
            Update your details and profile picture.
          </p>

          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">Profile updated successfully!</div>}
          {loading && <p>Loading...</p>}

          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                id="username"
                name="username"
                value={form.username}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label htmlFor="bio">Bio:</label>
              <textarea
                id="bio"
                name="bio"
                rows="3"
                value={form.bio}
                onChange={handleChange}
                placeholder="Tell us about yourself..."
              />
            </div>

            <div>
              <label htmlFor="profileImage">Profile Picture:</label>
              {previewImage && (
                <div style={{ marginBottom: '10px' }}>
                  <img
                    src={previewImage}
                    alt="Preview"
                    style={{ maxWidth: '150px', maxHeight: '150px', borderRadius: '8px' }}
                  />
                </div>
              )}
              <input
                type="file"
                id="profileImage"
                name="profileImage"
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>

            <div style={{ marginTop: '20px', marginBottom: '20px' }}>
              <button
                type="button"
                className="btn btn-remove"
                onClick={togglePasswordForm}
              >
                {showPasswordForm ? 'Hide Change Password' : 'Change Password'}
              </button>
            </div>

            {showPasswordForm && (
              <div className="change-password-section" style={{ marginBottom: '20px' }}>
                <h3>Change Password</h3>
                {passwordError && <div className="error-message">{passwordError}</div>}
                {passwordSuccess && <div className="success-message">{passwordSuccess}</div>}
                <div>
                  <label htmlFor="currentPassword">Current Password:</label>
                  <input
                    type="password"
                    id="currentPassword"
                    name="currentPassword"
                    value={passwordForm.currentPassword}
                    onChange={handlePasswordFormChange}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="newPassword">New Password:</label>
                  <input
                    type="password"
                    id="newPassword"
                    name="newPassword"
                    value={passwordForm.newPassword}
                    onChange={handlePasswordFormChange}
                    required
                  />
                </div>
                <div style={{ marginTop: '10px' }}>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handlePasswordSubmit}
                    disabled={passwordLoading}
                  >
                    {passwordLoading ? 'Changing...' : 'Update Password'}
                  </button>
                </div>
              </div>
            )}

            <div className="profile-edit-actions">
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProfileEdit;