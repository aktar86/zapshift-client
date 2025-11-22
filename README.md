### map

# 🗺️ Coverage Map – Interactive District Search & Navigation

This feature provides an interactive map system that allows users to search any district in Bangladesh and instantly navigate to that location on the map. It is built using **React Leaflet**, offering a smooth and user-friendly way to visualize service coverage areas.

---

## 🚀 Features

### 🔍 District Search

- Users can search any district by typing its name.
- The map automatically navigates (flyTo animation) to the matched district.
- Case-insensitive search ensures smooth user experience.

### 🗺️ Interactive Map

- Fully powered by **React Leaflet**
- Displays markers for all service center locations
- Popup shows:
  - District name
  - Covered areas
- Smooth zooming and navigation for a better map experience

### 📡 Dynamic Data Loading

- Coverage data is loaded through `useLoaderData()` from React Router
- Automatically renders coordinates and markers for each service center

---

## 📦 Technologies Used

- React.js
- React Router
- React Leaflet
- Leaflet.js
- Tailwind CSS _(optional for UI styling)_

---

## 📥 Installation (React Leaflet)

Install React Leaflet and Leaflet in your project:

```bash
npm install react-leaflet leaflet
```
