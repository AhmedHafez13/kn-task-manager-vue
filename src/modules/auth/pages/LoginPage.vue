<script setup lang="ts">
import STORAGE_KEYS from '@/const/storage-keys';
import AuthService from '@/sevices/auth.service';
import AppStorage from '@/utils/app.storage';
import { useAppToaster } from '@/utils/app.toaster';
import $v from '@/utils/app.validations';
import { useRouter } from 'vue-router';
import { VForm } from 'vuetify/components';

const loginForm: Ref<VForm | null> = ref(null);
const isLoading = ref(false);
const isPasswordVisible = ref(false);

const form = ref({
  email: '',
  password: '',
});

// ----- Services ----- //

const router = useRouter();
const toaster = useAppToaster();

// ----- Submit Form ----- //

const onSubmit = async () => {
  isLoading.value = true;
  if (loginForm.value) {
    try {
      const { valid } = await loginForm.value.validate();

      if (valid) {
        const res = await AuthService.login(form.value);
        if (res.user) {
          AppStorage.setData(STORAGE_KEYS.USER, res.user);
          router.push({ name: 'tasks' });
        }
      }
    } catch (error) {
      toaster.error(error);
    }
  }
  isLoading.value = false;
};

// ----- Validation Rules ----- //

const validationRules = computed(() => ({
  email: [
    (v: string) => $v.required(v) || 'Email is required',
    (v: string) => $v.isEmail(v) || 'Not a valid email',
  ],
  password: [
    (v: string) => $v.required(v) || 'Password is required',
    (v: string) => $v.minLength(v, 6) || 'Password is too short',
  ],
}));
</script>

<template>
  <div class="auth-wrapper d-flex align-center justify-center pa-4">
    <VCard class="auth-card pa-4 pt-7" max-width="448">
      <VCardText class="pt-2 text-center">
        <h4 class="text-h4 mb-2">Welcome to Tasks Manager App! 👋🏻</h4>
        <p class="mb-0">Please sign-in to your account and start the adventure</p>
      </VCardText>

      <VCardText>
        <VForm
          ref="loginForm"
          @submit.prevent="onSubmit"
          validate-on="invalid-input"
          :disabled="isLoading"
        >
          <VRow>
            <!-- email -->
            <VCol cols="12">
              <VTextField
                v-model="form.email"
                label="Email"
                type="email"
                :rules="validationRules.email"
                :disabled="isLoading"
              />
            </VCol>

            <!-- password -->
            <VCol cols="12">
              <VTextField
                v-model="form.password"
                label="Password"
                :rules="validationRules.password"
                :type="isPasswordVisible ? 'text' : 'password'"
                :append-inner-icon="isPasswordVisible ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
                @click:append-inner="isPasswordVisible = !isPasswordVisible"
                :disabled="isLoading"
              />
            </VCol>

            <!-- submit button -->
            <VBtn
              block
              type="submit"
              class="my-6"
              :disabled="isLoading"
              :loading="isLoading"
              text="Login"
              color="primary"
            />

            <!-- create account -->
            <VCol cols="12" class="text-center text-base">
              <span>New on our platform?</span>
              <RouterLink class="text-primary ms-2" to="/register">Create an account</RouterLink>
            </VCol>
          </VRow>
        </VForm>
      </VCardText>
    </VCard>
  </div>
</template>

<style lang="scss">
.auth-wrapper {
  min-block-size: calc(var(--vh, 1vh) * 90);
}

.auth-footer-mask {
  position: absolute;
  inset-block-end: 0;
  min-inline-size: 100%;
}

.auth-card {
  z-index: 1 !important;
}

.auth-footer-start-tree,
.auth-footer-end-tree {
  position: absolute;
  z-index: 1;
}

.auth-footer-start-tree {
  inset-block-end: 0;
  inset-inline-start: 0;
}

.auth-footer-end-tree {
  inset-block-end: 0;
  inset-inline-end: 0;
}

.auth-illustration {
  z-index: 1;
}

.auth-logo {
  position: absolute;
  z-index: 1;
  inset-block-start: 2rem;
  inset-inline-start: 2.3rem;
}

.auth-bg {
  background-color: rgb(var(--v-theme-surface));
}
</style>
