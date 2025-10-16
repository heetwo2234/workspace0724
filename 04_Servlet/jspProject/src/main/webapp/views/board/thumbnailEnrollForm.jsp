<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html lang="ko">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>사진게시글 작성</title>

	<style>
		.board-container {
			max-width: 900px;
			margin: 50px auto;
			padding: 2rem;
		}

		.board-card {
			background: white;
			border-radius: 8px;
			box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
			padding: 2rem;
		}

		.board-card h2 {
			text-align: center;
			color: #333;
			margin-bottom: 2rem;
			padding-bottom: 1rem;
			border-bottom: 2px solid #4b89fc;
		}

		.form-table {
			width: 100%;
			margin-bottom: 2rem;
		}

		.form-table tr {
			border-bottom: 1px solid #f0f0f0;
		}

		.form-table th {
			width: 150px;
			padding: 1rem;
			font-weight: 500;
			color: #555;
			text-align: left;
			vertical-align: top;
		}

		.form-table td {
			padding: 1rem;
		}

		.form-table input[type="text"],
		.form-table textarea {
			width: 100%;
			padding: 0.5rem;
			border: 1px solid #ddd;
			border-radius: 4px;
			font-size: 0.95rem;
			font-family: "Noto Sans KR", sans-serif;
		}

		.form-table textarea {
			resize: none;
		}

		.image-upload-area {
			text-align: center;
		}

		.thumbnail-preview {
			display: inline-block;
			width: 100%;
			max-width: 400px;
			height: 250px;
			border: 2px dashed #ddd;
			border-radius: 8px;
			background: #f8f9fa;
			display: flex;
			align-items: center;
			justify-content: center;
			cursor: pointer;
			transition: all 0.3s ease;
			overflow: hidden;
		}

		.thumbnail-preview:hover {
			border-color: #4b89fc;
			background: #f0f5ff;
		}

		.thumbnail-preview img {
			max-width: 100%;
			max-height: 100%;
			object-fit: contain;
		}

		.detail-images {
			display: flex;
			gap: 15px;
			justify-content: center;
		}

		.detail-image-preview {
			width: 180px;
			height: 140px;
			border: 2px dashed #ddd;
			border-radius: 8px;
			background: #f8f9fa;
			display: flex;
			align-items: center;
			justify-content: center;
			cursor: pointer;
			transition: all 0.3s ease;
			overflow: hidden;
		}

		.detail-image-preview:hover {
			border-color: #4b89fc;
			background: #f0f5ff;
		}

		.detail-image-preview img {
			max-width: 100%;
			max-height: 100%;
			object-fit: contain;
		}

		.upload-placeholder {
			color: #999;
			font-size: 0.9rem;
		}

		.button-group {
			display: flex;
			justify-content: center;
			gap: 0.5rem;
			margin-top: 2rem;
		}
	</style>
</head>
<body>
	<jsp:include page="/views/common/menubar.jsp" />

	<div class="board-container">
		<div class="board-card">
			<h2>사진게시글 작성하기</h2>

			<form action="" method="post" >
				<table class="form-table">
					<tr>
						<th>제목</th>
						<td>
							<input type="text" name="title" required placeholder="제목을 입력하세요">
						</td>
					</tr>
					<tr>
						<th>내용</th>
						<td>
							<textarea name="content" rows="7" placeholder="내용을 입력하세요"></textarea>
						</td>
					</tr>
					<tr>
						<th>대표이미지 *</th>
						<td class="image-upload-area">
							<div class="thumbnail-preview" onclick="">
								<img id="tumbnail-img" style="display: none;">
								<div class="upload-placeholder" id="thumbnail-placeholder">
									클릭하여 대표이미지를 선택하세요
								</div>
							</div>
						</td>
					</tr>
					<tr>
						<th>상세이미지</th>
						<td>
							<div class="detail-images">
								<div class="detail-image-preview" onclick="">
									<img id="content-img1" style="display: none;">
									<div class="upload-placeholder">이미지 1</div>
								</div>
								<div class="detail-image-preview" onclick="">
									<img id="content-img2" style="display: none;">
									<div class="upload-placeholder">이미지 2</div>
								</div>
								<div class="detail-image-preview" onclick="">
									<img id="content-img3" style="display: none;">
									<div class="upload-placeholder">이미지 3</div>
								</div>
							</div>
						</td>
					</tr>
				</table>

				<div style="display: none;">
					<input type="file" name="file1" id="file1" required onchange="">
					<input type="file" name="file2" id="file2" onchange="">
					<input type="file" name="file3" id="file3" onchange="">
					<input type="file" name="file4" id="file4" onchange="">
				</div>

				<div class="button-group">
					<button type="submit" class="btn btn-primary">작성하기</button>
					<button type="reset" class="btn btn-secondary">취소하기</button>
				</div>
			</form>
		</div>
	</div>
</body>
</html>
