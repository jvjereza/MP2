const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () => {
	container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
	container.classList.remove("right-panel-active");
});

// Get the sign-up and sign-in forms
const signUpForm = document.querySelector('.sign-up-container form');
const signInForm = document.querySelector('.sign-in-container form');

// Handle the sign-up form submission
signUpForm.addEventListener('submit', async (event) => {
	event.preventDefault();
	
	// Get the form data
	const formData = new FormData(signUpForm);
	
	// Send a request to the server to create a new user
	const response = await fetch('/api/users', {
	  method: 'POST',
	  body: formData
	});
	
	// Handle the response
	if (response.ok) {
	  // User account created successfully, redirect to dashboard
	  window.location.href = '/dashboard';
	} else {
	  // Display error message to the user
	  let errorData = { message: 'An unknown error occurred.' };
	  if (response.status !== 204) {
		errorData = await response.json();
	  }
	  alert(errorData.message);
	}
  });
  
  // Handle the sign-in form submission
  signInForm.addEventListener('submit', async (event) => {
	event.preventDefault();
	
	// Get the form data
	const formData = new FormData(signInForm);
	
	// Send a request to the server to authenticate the user
	const response = await fetch('/api/auth', {
	  method: 'POST',
	  body: formData
	});
	
	// Handle the response
	if (response.ok) {
	  // User authenticated successfully, redirect to dashboard
	  window.location.href = '/dashboard';
	} else {
	  // Display error message to the user
	  let errorData = { message: 'An unknown error occurred.' };
	  if (response.status !== 204) {
		errorData = await response.json();
	  }
	  alert(errorData.message);
	}
  });
  