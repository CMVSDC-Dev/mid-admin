<script setup>
import flatpickr from 'flatpickr';
import { onMounted } from 'vue';

onMounted(() => {
  // Init flatpickr
  flatpickr('.datepicker', {
    mode: 'single',
    static: false,
    monthSelectorType: 'dropdown',
    allowInput: true,
    // altInput: true,
    // altFormat: 'M j, Y',
    dateFormat: 'm/d/Y',
    // maxDate: 'today',
    prevArrow:
      '<svg class="fill-current" width="7" height="11" viewBox="0 0 7 11"><path d="M5.4 10.8l1.4-1.4-4-4 4-4L5.4 0 0 5.4z" /></svg>',
    nextArrow:
      '<svg class="fill-current" width="7" height="11" viewBox="0 0 7 11"><path d="M1.4 10.8L0 9.4l4-4-4-4L1.4 0l5.4 5.4z" /></svg>'
  })
})
</script>

<template>
  <div :class="`${horizontal ? 'flex w-full' : ''}  ${merged ? 'merged' : ''} ${customClasses}`">
    <label
      v-if="label"
      :class="`${classLabel} ${
        horizontal ? 'flex-0 mr-6 md:w-[100px] w-[60px] break-words' : ''
      }  ltr:inline-block rtl:block input-label text-black dark:text-white `"
      :for="name"
    >
      {{ label }}
      <span v-if="isRequired" class="text-red-600 text-lg">*</span>
    </label>
    <div
      class="flex items-stretch inputGroup "
      :class="`

    ${append || appendIcon ? 'has-append' : ''}
    ${prepend || prependIcon ? 'has-prepend' : ''}

    ${error ? 'is-invalid' : ''}  ${validate ? 'is-valid' : ''}

    ${$slots.prepend ? 'has-prepend-slot' : ''}
    ${$slots.append ? 'has-append-slot' : ''}
    ${horizontal ? 'flex-1' : ''}
    `"
    >
      <span
        class="flex-none input-group-addon"
        v-if="prepend || prependIcon || $slots.prepend"
      >
        <span
          class="input-group-text inline-block h-full"
          v-if="prepend || prependIcon"
        >
          {{ prepend }} <Icon :icon="prependIcon" v-if="prependIcon" />
        </span>
        <span class="inline-block h-full prepend-slot" v-if="$slots.prepend">
          <slot name="prepend"></slot>
        </span>
      </span>
      <div class="flex-1">
        <div
          class="relative fromGroup2"
          :class="`${error ? 'has-error' : ''}  ${validate ? 'is-valid' : ''}`"
        >
      <input
        class="datepicker w-full rounded border-[1.5px] border-stroke bg-transparent py-2 px-5 font-normal outline-none transition focus:border-primary-500 active:border-primary-500 dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary-500"
        :id="name"
        :name="name"
        :placeholder="placeholder"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        :error="error"
        :readonly="isReadonly"
        :disabled="disabled"
        :validate="validate"
        data-class="flatpickr-left"
      />

      <div class="pointer-events-none absolute inset-0 right-5 left-auto flex items-center">
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15.7504 2.9812H14.2879V2.36245C14.2879 2.02495 14.0066 1.71558 13.641 1.71558C13.2754 1.71558 12.9941 1.99683 12.9941 2.36245V2.9812H4.97852V2.36245C4.97852 2.02495 4.69727 1.71558 4.33164 1.71558C3.96602 1.71558 3.68477 1.99683 3.68477 2.36245V2.9812H2.25039C1.29414 2.9812 0.478516 3.7687 0.478516 4.75308V14.5406C0.478516 15.4968 1.26602 16.3125 2.25039 16.3125H15.7504C16.7066 16.3125 17.5223 15.525 17.5223 14.5406V4.72495C17.5223 3.7687 16.7066 2.9812 15.7504 2.9812ZM1.77227 8.21245H4.16289V10.9968H1.77227V8.21245ZM5.42852 8.21245H8.38164V10.9968H5.42852V8.21245ZM8.38164 12.2625V15.0187H5.42852V12.2625H8.38164V12.2625ZM9.64727 12.2625H12.6004V15.0187H9.64727V12.2625ZM9.64727 10.9968V8.21245H12.6004V10.9968H9.64727ZM13.8379 8.21245H16.2285V10.9968H13.8379V8.21245ZM2.25039 4.24683H3.71289V4.83745C3.71289 5.17495 3.99414 5.48433 4.35977 5.48433C4.72539 5.48433 5.00664 5.20308 5.00664 4.83745V4.24683H13.0504V4.83745C13.0504 5.17495 13.3316 5.48433 13.6973 5.48433C14.0629 5.48433 14.3441 5.20308 14.3441 4.83745V4.24683H15.7504C16.0316 4.24683 16.2566 4.47183 16.2566 4.75308V6.94683H1.77227V4.75308C1.77227 4.47183 1.96914 4.24683 2.25039 4.24683ZM1.77227 14.5125V12.2343H4.16289V14.9906H2.25039C1.96914 15.0187 1.77227 14.7937 1.77227 14.5125ZM15.7504 15.0187H13.8379V12.2625H16.2285V14.5406C16.2566 14.7937 16.0316 15.0187 15.7504 15.0187Z"
            fill="#64748B"
          />
        </svg>
      </div>




    <cleave
            :class="`${classInput} cleave w-full rounded border-[1.5px] text-black border-stroke bg-transparent py-2 px-5 font-normal outline-none transition focus:border-primary-500 active:border-primary-500 disabled:cursor-default disabled:bg-whiter dark:text-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary-500 `"
            :name="name"
            :placeholder="placeholder"
            :value="modelValue"
            @input="$emit('update:modelValue', $event.target.value)"
            :error="error"
            :id="name"
            :readonly="isReadonly"
            :disabled="disabled"
            :validate="validate"
            :options="options"
            v-if="isMask"
            modelValue="modelValue"
          />
          <div
            class="flex text-xl absolute ltr:right-[14px] rtl:left-[14px] top-1/2 -translate-y-1/2"
            v-if="error || validate"
          >
            <span v-if="error" class="text-danger-500">
              <Icon icon="heroicons-outline:information-circle" />
            </span>

            <span v-if="validate" class="text-success-500">
              <Icon icon="bi:check-lg" />
            </span>
          </div>
        </div>
      </div>
      <span
        class="flex-none input-group-addon right"
        v-if="append || appendIcon || $slots.append"
      >
        <span
          class="input-group-text inline-block h-full"
          v-if="append || appendIcon"
          >{{ append }} <Icon :icon="appendIcon" v-if="appendIcon"
        /></span>

        <span class="inline-block h-full append-slot" v-if="$slots.append">
          <slot name="append"></slot>
        </span>
      </span>
    </div>
    <span
      v-if="error"
      class="mt-2"
      :class="
        msgTooltip
          ? ' inline-block bg-danger-500 text-white text-[10px] px-2 py-1 rounded'
          : ' text-danger-500 block text-sm'
      "
      >{{ error }}</span
    >
    <span
      v-if="validate"
      class="mt-2"
      :class="
        msgTooltip
          ? ' inline-block bg-success-500 text-white text-[10px] px-2 py-1 rounded'
          : ' text-success-500 block text-sm'
      "
      >{{ validate }}</span
    >
    <span
      class="block text-slate-400 font-light leading-4 text-xs mt-2"
      v-if="description"
      >{{ description }}</span
    >
  </div>
</template>
<script>
import Icon from "@/components/Icon.vue";
import Cleave from "vue-cleave-component";
export default {
  components: { Icon, Cleave },
  props: {
    customClasses: String,
    prepend: {
      type: String,
    },
    append: {
      type: String,
    },
    placeholder: {
      type: String,
      default: "Search",
    },
    label: {
      type: String,
    },
    classLabel: {
      type: String,
      default: " ",
    },
    classInput: {
      type: String,
      default: "classinput",
    },
    classInputGroup: {
      type: String,
      default: " ",
    },
    type: {
      type: String,
      default: "text",
      //required: true,
    },
    name: {
      type: String,
    },
    modelValue: {
      type: String,
      default: "",
    },
    error: {
      type: String,
    },
    hasicon: {
      type: Boolean,
      default: false,
    },
    isReadonly: {
      type: Boolean,
      default: false,
    },
    isRequired: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    horizontal: {
      type: Boolean,
      default: false,
    },
    validate: {
      type: String,
    },
    msgTooltip: {
      type: Boolean,
      default: false,
    },
    description: {
      type: String,
    },
    prependIcon: {
      type: String,
    },
    appendIcon: {
      type: String,
    },
    merged: {
      type: Boolean,
      default: false,
    },
    isMask: {
      type: Boolean,
      default: false,
    },
    options: {
      type: Object,
      default: () => ({
        creditCard: true,
        delimiter: "-",
      }),
    },
  },
  data() {
    return {
      types: this.type,
    };
  },
};
</script>
<style lang="scss" scope>
.flatpickr-current-month .flatpickr-monthDropdown-months .flatpickr-monthDropdown-month {
  @apply bg-white dark:bg-slate-800;
}
// .flatpickr-day.today {
//   @apply bg-gray-100 dark:bg-slate-800;
// }
// .flatpickr-day.today:hover, .flatpickr-day.today:focus {
//   @apply bg-gray-400 dark:bg-slate-800;
// }
.input-group-control {
  @apply bg-white dark:bg-slate-900 dark:placeholder:text-slate-400 transition duration-300 ease-in-out border border-slate-200 dark:border-slate-700 focus:ring-0  focus:outline-none
  rounded placeholder:text-slate-400 text-slate-900 text-sm px-3  placeholder:font-light focus:border-slate-600  dark:focus:border-slate-900 dark:text-white;
}
.input-label {
  @apply mb-2 text-slate-500 text-sm leading-6 capitalize cursor-pointer;
}
.fromGroup2 {
  &.has-error {
    .input-group-control {
      @apply focus:ring-opacity-90 focus:ring-1;
    }
  }
  &.is-valid {
    .input-group-control {
      @apply focus:ring-opacity-90 focus:ring-1;
    }
  }
}

.input-group-control[readonly] {
  @apply bg-slate-200 text-slate-400 dark:bg-slate-600;
}

.input-group-control[disabled] {
  @apply cursor-not-allowed bg-slate-50 text-slate-400 placeholder:text-opacity-60 dark:bg-slate-600;
}

.input-group-text {
  @apply bg-white dark:bg-slate-900 transition duration-300 ease-in-out  flex items-center justify-center px-3 border
   border-slate-200 dark:border-slate-700 ltr:rounded-tl rtl:rounded-tr rtl:rounded-br ltr:rounded-bl text-slate-400 text-base font-light;
}
.inputGroup.has-prepend {
  .input-group-control {
    @apply ltr:border-l-0 rtl:border-r-0 ltr:rounded-tl-[0] rtl:rounded-tr-[0] ltr:rounded-bl-[0] rtl:rounded-br-[0];
  }
}
.inputGroup {
  &.has-prepend-slot {
    .input-group-control {
      @apply ltr:border-l-0 rtl:border-r-0 ltr:rounded-tl-[0] rtl:rounded-tr-[0] ltr:rounded-bl-[0] rtl:rounded-br-[0] focus:ring-0 focus:border-slate-600 dark:focus:border-slate-700;
    }
  }
  &.has-append-slot {
    .input-group-control {
      @apply ltr:border-r-0 rtl:border-l-0 ltr:rounded-tr-[0] rtl:rounded-tl-[0] ltr:rounded-br-[0] rtl:rounded-bl-[0] focus:ring-0 focus:border-slate-600 dark:focus:border-slate-700;
    }
  }
}
.inputGroup.has-append {
  .input-group-control {
    @apply ltr:border-r-0 rtl:border-l-0 ltr:rounded-tr-[0] rtl:rounded-tl-[0] rounded-br-[0] rtl:rounded-bl-[0];
  }
  .input-group-addon.right {
    .input-group-text {
      @apply ltr:rounded-tl-[0] ltr:rounded-bl-[0] ltr:rounded-tr ltr:rounded-br rtl:rounded-tl  rtl:rounded-bl rtl:rounded-tr-[0] rtl:rounded-br-[0];
    }
  }
}


/* .merged .inputGroup:focus-within .input-group-text {
} */
.prepend-slot,
.append-slot {
  .btn {
    @apply pt-0 pb-0 h-full items-center hover:ring-0 rounded-tr-[0] rounded-br-[0];
  }
  > div,
  button {
    @apply h-full;
  }
}
.input-group-addon {
  &.right {
    .append-slot {
      .btn {
        @apply rounded-tl-[0] rounded-bl-[0] rounded-tr rounded-br;
      }
    }
  }
}
.merged {
  .input-group-addon {
    .input-group-text {
      @apply ltr:border-r-0  ltr:pr-0 rtl:border-l-0 rtl:pl-0;
    }
    &.right {
      .input-group-text {
        @apply ltr:border-l-0 rtl:border-r-0 ltr:border-r rtl:border-l ltr:pr-3 rtl:pl-3 ltr:pl-0 rtl:pr-0;
      }
    }
  }
}
</style>

