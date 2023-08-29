import { useState, useEffect } from "react";

function CatsAPI() {
	const [cats, setCats] = useState([]);
	const [newPost, setNewPost] = useState({ title: "", description: "" });
	const [editIndex, setEditIndex] = useState(-1);

	useEffect(() => {
		fetch("https://cataas.com/api/cats?limit=5")
			.then((response) => response.json())
			.then((data) => setCats(data));
	}, []);

	const handleInputChange = (event) => {
		setNewPost({ ...newPost, [event.target.name]: event.target.value });
	};

	const addPost = () => {
		if (editIndex === -1) {
			setCats([...cats, newPost]);
		} else {
			const updatedCats = [...cats];
			updatedCats[editIndex] = newPost;
			setCats(updatedCats);
			setEditIndex(-1);
		}
		setNewPost({ title: "", description: "" });
	};

	const deletePost = (index) => {
		const updatedCats = [...cats];
		updatedCats.splice(index, 1);
		setCats(updatedCats);
	};

	const editPost = (index) => {
		setEditIndex(index);
		setNewPost(cats[index]);
	};

	return (
		<div>
			<h1>Cats API</h1>
			<ul>
				{cats.map((cat, index) => (
					<li key={index}>
						<img src={`https://cataas.com/cat?${index}`} alt="Cat" />
						{editIndex === index ? (
							<div>
								<input
									type="text"
									name="title"
									placeholder="Заголовок"
									value={newPost.title}
									onChange={handleInputChange}
								/>
								<input
									type="text"
									name="description"
									placeholder="Описание"
									value={newPost.description}
									onChange={handleInputChange}
								/>
								<button onClick={addPost}>Сохранить</button>
							</div>
						) : (
							<div>
								<h3>{cat.title}</h3>
								<p>{cat.description}</p>
								<button onClick={() => deletePost(index)}>Удалить</button>
								<button onClick={() => editPost(index)}>Редактировать</button>
							</div>
						)}
					</li>
				))}
			</ul>
			{editIndex && (
				<div>
					<input
						type="text"
						name="title"
						placeholder="Заголовок"
						value={newPost.title}
						onChange={handleInputChange}
					/>
					<input
						type="text"
						name="description"
						placeholder="Описание"
						value={newPost.description}
						onChange={handleInputChange}
					/>
					<button onClick={addPost}>Добавить</button>
				</div>
			)}
		</div>
	);
}

export default CatsAPI;