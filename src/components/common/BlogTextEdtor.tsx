// import React, { useState, useRef } from "react";
// import {
//   MDXEditor,
//   imagePlugin,
//   headingsPlugin,
//   listsPlugin,
//   quotePlugin,
//   toolbarPlugin,
//   UndoRedo,
//   BoldItalicUnderlineToggles,
//   InsertImage,
// } from "@mdxeditor/editor";
// import "@mdxeditor/editor/style.css";

// export default function BlogEditor() {
//   const [markdown, setMarkdown] = useState(
//     "# Write your title here...\n\nStart your blog content...",
//   );

//   const pendingFilesRef = useRef(new Map());

//   const handleImagePreview = async (imageFile: any) => {
//     const localBlobUrl = URL.createObjectURL(imageFile);
//     pendingFilesRef.current.set(localBlobUrl, imageFile);
//     return localBlobUrl; // Renders preview instantly without server upload
//   };

//   const handlePublishPost = async () => {
//     let finalMarkdown = markdown;

//     for (const [localBlobUrl, file] of pendingFilesRef.current.entries()) {
//       const formData = new FormData();
//       formData.append("file", file);
//       formData.append("folder", "common");
//       formData.append("alt", "image");

//       try {
//         const response = await fetch(
//           "https://api.yatrifly.com/api/v1/media/upload",
//           {
//             method: "POST",
//             body: formData,
//           },
//         );
//         const data = await response.json();

//         console.log(data, "data is here");

//         finalMarkdown = finalMarkdown.replaceAll(localBlobUrl, data?.data?.url);
//       } catch (error) {
//         console.error("Image upload failed:", error);
//         alert("Failed to upload image. Publish cancelled.");
//         return;
//       }
//     }

//     pendingFilesRef.current.clear();

//     // 3. Send clean text content and image URLs to your backend database
//     await fetch("http://localhost:5000/api/posts", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         title: "My Blog Post",
//         content: finalMarkdown, // Only text & URLs go here! Zero database bloat.
//       }),
//     });

//     alert("Success! Your blog post has been published.");
//   };

//   return (
//     <div
//       style={{
//         maxWidth: "800px",
//         margin: "40px auto",
//         padding: "20px",
//         fontFamily: "sans-serif",
//       }}
//     >
//       <h2>Create New Blog Post</h2>

//       <div
//         style={{
//           border: "1px solid #ccc",
//           borderRadius: "8px",
//           minHeight: "350px",
//           padding: "10px",
//         }}
//       >
//         <MDXEditor
//           markdown={markdown}
//           onChange={setMarkdown}
//           plugins={[
//             headingsPlugin(),
//             listsPlugin(),
//             quotePlugin(),
//             imagePlugin({ imageUploadHandler: handleImagePreview }),
//             toolbarPlugin({
//               toolbarContents: () => (
//                 <>
//                   <UndoRedo />
//                   <BoldItalicUnderlineToggles />
//                   <InsertImage />
//                 </>
//               ),
//             }),
//           ]}
//         />
//       </div>

//       <button
//         onClick={handlePublishPost}
//         style={{
//           marginTop: "20px",
//           padding: "12px 24px",
//           background: "#0070f3",
//           color: "#fff",
//           border: "none",
//           borderRadius: "6px",
//           cursor: "pointer",
//           fontWeight: "bold",
//         }}
//       >
//         Publish Blog Post
//       </button>
//     </div>
//   );
// }

// src/components/BlogEditor.jsx
import React, { useState, useRef } from "react";
import {
  MDXEditor,
  imagePlugin,
  headingsPlugin,
  listsPlugin,
  quotePlugin,
  thematicBreakPlugin,
  linkPlugin,
  toolbarPlugin,
  UndoRedo,
  BoldItalicUnderlineToggles,
  InsertImage,
  BlockTypeSelect,
  ListsToggle,
  InsertTable,
  InsertCodeBlock,
  CreateLink,
  StrikeThroughSupSubToggles,
  CodeToggle,
} from "@mdxeditor/editor";
import "@mdxeditor/editor/style.css";

export default function BlogEditor() {
  const [markdown, setMarkdown] = useState(
    "# Write your title here...\n\nStart your blog content...",
  );

  const pendingFilesRef = useRef(new Map());

  const handleImagePreview = async (imageFile: any) => {
    const localBlobUrl = URL.createObjectURL(imageFile);
    pendingFilesRef.current.set(localBlobUrl, imageFile);
    return localBlobUrl; // Renders preview instantly without server upload
  };

  const handlePublishPost = async () => {
    let finalMarkdown = markdown;

    for (const [localBlobUrl, file] of pendingFilesRef.current.entries()) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", "common");
      formData.append("alt", "image");

      try {
        const response = await fetch(
          "https://api.yatrifly.com/api/v1/media/upload",
          {
            method: "POST",
            body: formData,
          },
        );
        const data = await response.json();

        console.log(data, "data is here");

        finalMarkdown = finalMarkdown.replaceAll(localBlobUrl, data?.data?.url);
      } catch (error) {
        console.error("Image upload failed:", error);
        alert("Failed to upload image. Publish cancelled.");
        return;
      }
    }

    pendingFilesRef.current.clear();

    // Send clean text content and image URLs to your backend database
    await fetch("http://localhost:5000/api/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: "My Blog Post",
        content: finalMarkdown, // Only text & URLs go here! Zero database bloat.
      }),
    });

    alert("Success! Your blog post has been published.");
  };

  return (
    <div
      style={{
        maxWidth: "900px",
        margin: "40px auto",
        padding: "20px",
        fontFamily: "sans-serif",
      }}
    >
      <h2>English Content *</h2>

      <div
        style={{
          border: "1px solid #ccc",
          borderRadius: "8px",
          minHeight: "400px",
          padding: "10px",
        }}
      >
        <MDXEditor
          markdown={markdown}
          onChange={setMarkdown}
          plugins={[
            headingsPlugin(),
            listsPlugin(),
            quotePlugin(),
            linkPlugin(),
            imagePlugin({ imageUploadHandler: handleImagePreview }),
            toolbarPlugin({
              toolbarContents: () => (
                <>
                  <UndoRedo />
                  <BlockTypeSelect />
                  <BoldItalicUnderlineToggles />
                  <StrikeThroughSupSubToggles />
                  <ListsToggle />
                  <CreateLink />
                  <InsertImage />
                </>
              ),
            }),
          ]}
        />
      </div>

      <button
        onClick={handlePublishPost}
        style={{
          marginTop: "20px",
          padding: "12px 24px",
          background: "#0070f3",
          color: "#fff",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
          fontWeight: "bold",
        }}
      >
        Publish Blog Post
      </button>
    </div>
  );
}
