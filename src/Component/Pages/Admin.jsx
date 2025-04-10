import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


export default function Dashboard() {
  const navigate = useNavigate();

  // Initialize state with sample data
  const [blogPosts, setBlogPosts] = useState([
    {
      id: 1,
      date: "Mar 16, 2020",
      category: "Helping",
      title: "Change the World",
      description: "Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde.",
      postImage: "./Image/school2.jpeg",
    },
  ]);

  const [teamMembers, setTeamMembers] = useState([
    {
      id: 1,
      name: "John Doe",
      role: "CEO",
      image: "./Image/team1.jpeg",
    },
    {
      id: 2,
      name: "Jane Smith",
      role: "CTO",
      image: "./Image/team2.jpeg",
    },
  ]);

  // State for managing forms
  const [editingPost, setEditingPost] = useState(null);
  const [editingTeamMember, setEditingTeamMember] = useState(null);
  const [isAddFormVisible, setIsAddFormVisible] = useState(false);
  const [isAddTeamFormVisible, setIsAddTeamFormVisible] = useState(false);

  // Blog post CRUD operations
  const addBlogPost = (formData) => {
    const newId = blogPosts.length > 0 ? Math.max(...blogPosts.map(p => p.id)) + 1 : 1;
    const newPost = {
      id: newId,
      ...formData,
      postImage: formData.postImage instanceof File 
        ? URL.createObjectURL(formData.postImage) 
        : formData.postImage || ""
    };
    setBlogPosts([...blogPosts, newPost]);
    setIsAddFormVisible(false);
  };

  const editBlogPost = (updatedPost) => {
    setBlogPosts(blogPosts.map(post => 
      post.id === updatedPost.id ? {
        ...updatedPost,
        postImage: updatedPost.postImage instanceof File 
          ? URL.createObjectURL(updatedPost.postImage) 
          : updatedPost.postImage
      } : post
    ));
    setEditingPost(null);
  };

  const deleteBlogPost = (id) => {
    const post = blogPosts.find(p => p.id === id);
    if (post?.postImage?.startsWith('blob:')) {
      URL.revokeObjectURL(post.postImage);
    }
    setBlogPosts(blogPosts.filter(post => post.id !== id));
  };

  // Team member CRUD operations
  const addTeamMember = (formData) => {
    const newId = teamMembers.length > 0 ? Math.max(...teamMembers.map(m => m.id)) + 1 : 1;
    const newMember = {
      id: newId,
      ...formData,
      image: formData.image instanceof File 
        ? URL.createObjectURL(formData.image) 
        : formData.image || ""
    };
    setTeamMembers([...teamMembers, newMember]);
    setIsAddTeamFormVisible(false);
  };

  const editTeamMember = (updatedMember) => {
    setTeamMembers(teamMembers.map(member => 
      member.id === updatedMember.id ? {
        ...updatedMember,
        image: updatedMember.image instanceof File 
          ? URL.createObjectURL(updatedMember.image) 
          : updatedMember.image
      } : member
    ));
    setEditingTeamMember(null);
  };

  const deleteTeamMember = (id) => {
    const member = teamMembers.find(m => m.id === id);
    if (member?.image?.startsWith('blob:')) {
      URL.revokeObjectURL(member.image);
    }
    setTeamMembers(teamMembers.filter(member => member.id !== id));
  };

  // Clean up object URLs
  useEffect(() => {
    return () => {
      blogPosts.forEach(post => {
        if (post?.postImage?.startsWith('blob:')) {
          URL.revokeObjectURL(post.postImage);
        }
      });
      teamMembers.forEach(member => {
        if (member?.image?.startsWith('blob:')) {
          URL.revokeObjectURL(member.image);
        }
      });
    };
  }, [blogPosts, teamMembers]);

  const handleLogout = () => navigate("/");

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <header className="bg-white shadow rounded-lg p-4 mb-8 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-600">
          NIITUJA EDUCATIONAL & WELFARE FOUNDATION
        </h1>
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
        >
          Logout
        </button>
      </header>

      {/* Blog Management Section */}
      <BlogSection 
        posts={blogPosts}
        onAdd={() => setIsAddFormVisible(true)}
        onEdit={setEditingPost}
        onDelete={deleteBlogPost}
        showAddForm={isAddFormVisible}
        showEditForm={!!editingPost}
        onAddSubmit={addBlogPost}
        onEditSubmit={editBlogPost}
        onCloseForm={() => {
          setIsAddFormVisible(false);
          setEditingPost(null);
        }}
        editData={editingPost}
      />

      {/* Team Management Section */}
      <TeamSection 
        members={teamMembers}
        onAdd={() => setIsAddTeamFormVisible(true)}
        onEdit={setEditingTeamMember}
        onDelete={deleteTeamMember}
        showAddForm={isAddTeamFormVisible}
        showEditForm={!!editingTeamMember}
        onAddSubmit={addTeamMember}
        onEditSubmit={editTeamMember}
        onCloseForm={() => {
          setIsAddTeamFormVisible(false);
          setEditingTeamMember(null);
        }}
        editData={editingTeamMember}
      />
    </div>
  );
}

// Blog Section Component
function BlogSection({ 
  posts, onAdd, onEdit, onDelete, 
  showAddForm, showEditForm, editData,
  onAddSubmit, onEditSubmit, onCloseForm 
}) {
  return (
    <section className="mb-12">
      <h2 className="text-3xl font-bold text-gray-900 mb-4">Blog Management</h2>
      <button
        onClick={onAdd}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg mb-8 hover:bg-blue-700 transition-colors"
      >
        Add New Blog
      </button>

      {showAddForm && (
        <BlogForm
          onSubmit={onAddSubmit}
          onCancel={onCloseForm}
        />
      )}

      {showEditForm && (
        <BlogForm
          initialData={editData}
          onSubmit={onEditSubmit}
          onCancel={onCloseForm}
        />
      )}

      <div className="grid md:grid-cols-3 gap-8">
        {posts.map((post) => (
          <BlogPostCard 
            key={post.id}
            post={post}
            onEdit={() => onEdit(post)}
            onDelete={() => onDelete(post.id)}
          />
        ))}
      </div>
    </section>
  );
}

// Blog Post Card Component
function BlogPostCard({ post, onEdit, onDelete }) {
  return (
    <div className="bg-white shadow rounded-lg p-4 hover:shadow-lg transition-shadow">
      <img
        src={post.postImage}
        alt={post.title}
        className="w-full h-56 object-cover rounded-lg"
      />
      <div className="mt-4 text-gray-500 flex items-center space-x-2">
        <span>{post.date}</span>
        <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded-full text-sm">
          {post.category}
        </span>
      </div>
      <h3 className="mt-2 text-lg font-semibold text-gray-900">
        {post.title}
      </h3>
      <p className="text-gray-500 mt-1">{post.description}</p>
      <div className="mt-4 flex space-x-2">
        <button
          onClick={onEdit}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Edit
        </button>
        <button
          onClick={onDelete}
          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

// Team Section Component
function TeamSection({ 
  members, onAdd, onEdit, onDelete, 
  showAddForm, showEditForm, editData,
  onAddSubmit, onEditSubmit, onCloseForm 
}) {
  return (
    <section>
      <h2 className="text-3xl font-bold text-gray-900 mb-4">Team Management</h2>
      <button
        onClick={onAdd}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg mb-8 hover:bg-blue-700 transition-colors"
      >
        Add New Team Member
      </button>

      {showAddForm && (
        <TeamForm
          onSubmit={onAddSubmit}
          onCancel={onCloseForm}
        />
      )}

      {showEditForm && (
        <TeamForm
          initialData={editData}
          onSubmit={onEditSubmit}
          onCancel={onCloseForm}
        />
      )}

      <div className="grid md:grid-cols-3 gap-8">
        {members.map((member) => (
          <TeamMemberCard 
            key={member.id}
            member={member}
            onEdit={() => onEdit(member)}
            onDelete={() => onDelete(member.id)}
          />
        ))}
      </div>
    </section>
  );
}

// Team Member Card Component
function TeamMemberCard({ member, onEdit, onDelete }) {
  return (
    <div className="bg-white shadow rounded-lg p-4 hover:shadow-lg transition-shadow">
      <img
        src={member.image}
        alt={member.name}
        className="w-full h-56 object-cover rounded-lg"
      />
      <h3 className="mt-4 text-lg font-semibold text-gray-900">
        {member.name}
      </h3>
      <p className="text-gray-500 mt-1">{member.role}</p>
      <div className="mt-4 flex space-x-2">
        <button
          onClick={onEdit}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Edit
        </button>
        <button
          onClick={onDelete}
          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

// Blog Form Component
function BlogForm({ initialData, onSubmit, onCancel }) {
  const [formData, setFormData] = useState(
    initialData || {
      date: "",
      category: "",
      title: "",
      description: "",
      postImage: null,
    }
  );

  const [imagePreview, setImagePreview] = useState(initialData?.postImage || "");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setFormData(prev => ({ ...prev, postImage: file }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  useEffect(() => {
    return () => {
      if (imagePreview?.startsWith('blob:')) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  return (
    <ModalForm 
      title={initialData ? "Edit Blog Post" : "Add New Blog Post"}
      onSubmit={handleSubmit}
      onCancel={onCancel}
    >
      <input
        type="text"
        name="date"
        placeholder="Date"
        value={formData.date}
        onChange={handleChange}
        className="w-full p-2 border rounded-lg"
        required
      />
      <input
        type="text"
        name="category"
        placeholder="Category"
        value={formData.category}
        onChange={handleChange}
        className="w-full p-2 border rounded-lg"
        required
      />
      <input
        type="text"
        name="title"
        placeholder="Title"
        value={formData.title}
        onChange={handleChange}
        className="w-full p-2 border rounded-lg"
        required
      />
      <textarea
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
        className="w-full p-2 border rounded-lg"
        required
        rows={4}
      />
      <FileUpload 
        label="Post Image"
        onChange={handleImageUpload}
        preview={imagePreview}
        required={!initialData}
        previewClass="w-full h-32 object-cover rounded-lg"
      />
    </ModalForm>
  );
}

// Team Form Component
function TeamForm({ initialData, onSubmit, onCancel }) {
  const [formData, setFormData] = useState(
    initialData || {
      name: "",
      role: "",
      image: null,
    }
  );

  const [imagePreview, setImagePreview] = useState(initialData?.image || "");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setFormData(prev => ({ ...prev, image: file }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  useEffect(() => {
    return () => {
      if (imagePreview?.startsWith('blob:')) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  return (
    <ModalForm 
      title={initialData ? "Edit Team Member" : "Add New Team Member"}
      onSubmit={handleSubmit}
      onCancel={onCancel}
    >
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
        className="w-full p-2 border rounded-lg"
        required
      />
      <input
        type="text"
        name="role"
        placeholder="Role"
        value={formData.role}
        onChange={handleChange}
        className="w-full p-2 border rounded-lg"
        required
      />
      <FileUpload 
        label="Team Member Image"
        onChange={handleImageUpload}
        preview={imagePreview}
        required={!initialData}
        previewClass="w-20 h-20 rounded-full object-cover"
      />
    </ModalForm>
  );
}

// Reusable Modal Form Component
function ModalForm({ title, children, onSubmit, onCancel }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        <form onSubmit={onSubmit} className="space-y-4">
          {children}
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onCancel}
              className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              {title.startsWith("Edit") ? "Save Changes" : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Reusable File Upload Component
function FileUpload({ label, onChange, preview, required, previewClass }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type="file"
        accept="image/*"
        onChange={onChange}
        className="mt-1 block w-full"
        required={required}
      />
      {preview && (
        <img
          src={preview}
          alt="Preview"
          className={`mt-2 ${previewClass}`}
        />
      )}
    </div>
  );
}