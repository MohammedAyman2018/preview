<template>
	<b-container>
		<AdminNav />
		<main class="my-5">
			<h2 class="header">تعديل المقال</h2>
			<b-form class="text-center" @submit="onSubmit">
				<!-- Start form-group -->
				<b-form-group id="input-title" label="عنوان المقال:" label-for="title">
					<b-form-input id="title" v-model="form.title" required placeholder="أدخل عنوان المقال"></b-form-input>
				</b-form-group>
				<!-- End form-group -->

				<!-- Start form-group -->
				<b-form-group id="input-author" label="اسم الكاتب:" label-for="author">
					<b-form-input id="author" v-model="form.author" required placeholder="ادخل اسم الكاتب"></b-form-input>
				</b-form-group>
				<!-- End form-group -->

				<!-- Create the editor container -->
				<div id="editor"></div>

				<div id="preview" class="my-5"></div>

				<div class="actions d-flex justify-text-center py-3">
					<b-button variant="warning" class="mx-2" @click="preview" size="lg">عرض شكل المقال.</b-button>
					<b-button variant="primary" type="submit" size="lg">إضف المقال</b-button>
				</div>
			</b-form>
		</main>
	</b-container>
</template>

<script>
import AdminNav from "~/components/AdminNav";

let editor;
export default {
	async validate({ store }) {
		if (!store.state.user) return false;
		else if (!store.state.user.token) return false;
		return true;
	},
	data() {
		return {
			form: {
				Oldtitle: this.$store.state.article.title,
				title: this.$store.state.article.title,
				author: this.$store.state.article.author,
				text: this.$store.state.article.text
			}
		};
	},
	mounted() {
		this.$nextTick(() => {
			editor = new Quill("#editor", {
				readOnly: false,
				modules: {
					toolbar: [
						["bold", "italic", "underline", "strike"], // toggled buttons
						["blockquote", "code-block", "image", "full-screen"],

						[{ header: 1 }, { header: 2 }], // custom button values
						[{ list: "ordered" }, { list: "bullet" }],
						[{ script: "sub" }, { script: "super" }], // superscript/subscript
						[{ indent: "-1" }, { indent: "+1" }], // outdent/indent
						[{ direction: "rtl" }], // text direction

						[{ header: [1, 2, 3, 4, 5, 6, false] }],

						[{ color: [] }, { background: [] }], // dropdown with defaults from theme
						[{ font: [] }],
						[{ align: [] }],

						["clean"] // remove formatting button
					]
				},
				theme: "snow"
			});
			editor.root.innerHTML = this.form.text;
		});
	},
	components: {
		AdminNav
	},
	methods: {
		preview() {
			document.getElementById("preview").innerHTML = editor.root.innerHTML;
		},
		async onSubmit(evt) {
			evt.preventDefault();
			this.form.text = String(editor.root.innerHTML);

			this.form.Oldtitle = this.form.Oldtitle.split(" ").join("-");

			await this.$axios.$put("/api/posts", this.form).then(res => {
				Swal.fire({
					title: " تم إضافة المقال بنجاح",
					icon: "success",
					showCloseButton: true
				}).then(res => {
					this.$router.push("/grammer");
				});
			});
		}
	},
	head() {
		return {
			link: [{ href: "/css/editor.css", rel: "stylesheet" }],
			script: [{ src: "/js/editor.min.js" }, { src: "/js/sweatalert.js" }],
			title: "قواعد | تعديل مقال"
		};
	}
};
</script>