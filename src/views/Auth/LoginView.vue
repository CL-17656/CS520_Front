<script setup>
import { reactive } from 'vue';
import { useAuthenticationStore } from '@/stores/Auth';
import { useRouter } from "vue-router";
import { loginUser } from '@/api/AuthApi'; // added

const loginData = reactive(
    {
        accountType: "",
        username: "",
        password: "",
    }
);

const errors = reactive(
    {
        accountType: [],
        username: [],
        password: [],
        shouldSubmit: true,
    }
);

const loginSuccess = reactive(
    {
        success: false,
    }
);

function resetErrors()
{
    errors.accountType = [];
    errors.username = [];
    errors.password = [];
    errors.shouldSubmit = true;
}

const store = useAuthenticationStore();
const router = useRouter();
    
// function submit()
// {
//     resetErrors();
//     loginSuccess.success = false;
//     if(loginData.accountType === "") {
//         errors.accountType.push("must select an account type");
//         errors.shouldSubmit = false;
//     }
//     if(loginData.email === "") {
//         errors.email.push("must enter an emial");
//         errors.shouldSubmit = false;
//     }
//     if(loginData.password === "") {
//         errors.password.push("must enter password");
//         errors.shouldSubmit = false;
//     }
//     if(errors.shouldSubmit)
//     {
//         //post to server
//         //TEMPRORY
//         loginSuccess.success = true; 
//         //TEMPRORY
//     }
//     //redirect to login page if success
//     //possibly need to move to another function as web request are async
//     console.log(loginSuccess.success);
//     if(loginSuccess.success)
//     {
//         if(loginData.accountType === "Instructor") {
//             router.push({ name: 'instructorhome'});
//         }
//         else if(loginData.accountType === "Student")
//         {
//             router.push({ name: 'studenthome'});
//         }
//     }
//     console.log(errors);
//     console.log(loginData);
// }

// modified submit function:
async function submit() 
{
    resetErrors();

    // Validating the input fields
    if (!loginData.accountType) 
    {
        errors.accountType.push('Must select an account type');
        errors.shouldSubmit = false;
    }
    if (!loginData.username) 
    {
        errors.username.push('Must enter an username');
        errors.shouldSubmit = false;
    }
    if (!loginData.password) 
    {
        errors.password.push('Must enter a password');
        errors.shouldSubmit = false;
    }

    // If all fields are valid, proceed with login
    if (errors.shouldSubmit) {
        try {
            console.log(loginData);
            // Call the login API
            const response = await loginUser(loginData);

            if(response.flag == false) {
                console.error('Login failed:', response);
                errors.username.push('Login failed. Please check your credentials.');
            }
            else {
                // Store the token in Pinia and localStorage
                store.token = response.token;
                localStorage.setItem('authToken', response.token);

                // Redirect based on account type (Student or Instructor)
                if (loginData.accountType === 'Instructor') {
                    router.push({ name: 'instructorhome' });
                } else if (loginData.accountType === 'Student') {
                    router.push({ name: 'studenthome' });
                }
            }
        } catch (error) {
            console.error('Login failed:', error);
            errors.username.push('Login failed. Please check your credentials.');
        }
    }
}

</script>

<template>
  <main>
    <h1 class = "title"> Login into your account</h1>
  </main>

  <form @submit.prevent="submit" class="w-1/2 mx-auto space-y-6">
    <div>
        <label for="accountType" class="register">Select Account Type</label>
        <select id="accountType" class="register" v-model="loginData.accountType">
            <option value="Student">Student</option>
            <option value="Instructor">Instructor</option>
        </select>
        <h1 class="text-red-600" v-if="errors.accountType.length > 0">{{errors.accountType[0]}}</h1>
    </div>

    <div>
        <input type="text" placeholder="Enter Username" v-model="loginData.username"/>
        <h1 class="text-red-600" v-if="errors.username.length > 0">{{errors.username[0]}}</h1>
    </div>

    <div>
        <input type="password" placeholder="Enter Password" v-model="loginData.password"/>
        <h1 class="text-red-600" v-if="errors.password.length > 0">{{errors.password[0]}}</h1>
    </div>

    <button class="primary-btn">Register</button>
  </form>
</template>
