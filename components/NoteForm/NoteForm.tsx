import { useMutation, useQueryClient } from "@tanstack/react-query";
import css from "./NoteForm.module.css";
import { Formik, Form, Field, ErrorMessage, type FormikHelpers } from "formik";
import { useId } from "react";
import { createNote, queryKey } from "@/lib/api";
import * as Yup from "yup";

import type { CreateNote } from "../../types/note";
interface NoteFormProps {
  onCancel: () => void;
  onSuccess: () => void;
}
const initialValues: CreateNote = {
  title: "",
  content: "",
  tag: "Todo",
};
const NoteFormSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, "Title too short")
    .max(50, "Title too long")
    .matches(
      /^[^\s].*[^\s]$/,
      "Spaces at the beginning and end are not allowed",
    )
    .required("Title is required"),
  content: Yup.string().max(500, "Content too long"),
  tag: Yup.string()
    .oneOf(["Todo", "Work", "Personal", "Meeting", "Shopping"], "Invalid tag")
    .required("Select tag"),
});
export default function NoteForm({ onCancel, onSuccess }: NoteFormProps) {
  const handleSubmit = (
    values: CreateNote,
    actions: FormikHelpers<CreateNote>,
  ) => {
    console.log("Order data:", values);
    createMutation.mutate(values);
    actions.resetForm();
  };
  const fieldId = useId();
  const queryClient = useQueryClient();
  const createMutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKey] });
      onSuccess();
    },
    onError: (error) => {
      console.error(error);
    },
  });
  const handleCancel = () => {
    onCancel();
  };

  return (
    <Formik
      validationSchema={NoteFormSchema}
      initialValues={initialValues}
      onSubmit={handleSubmit}
    >
      <Form className={css.form}>
        <div className={css.formGroup}>
          <label htmlFor={`${fieldId}-title`}>Title</label>
          <Field
            id={`${fieldId}-title`}
            type="text"
            name="title"
            className={css.input}
          />
          <ErrorMessage name="title" component="span" className={css.error} />
        </div>

        <div className={css.formGroup}>
          <label htmlFor={`${fieldId}-content`}>Content</label>
          <Field
            as="textarea"
            id={`${fieldId}-content`}
            name="content"
            rows={8}
            className={css.textarea}
          />
          <ErrorMessage component="span" name="content" className={css.error} />
        </div>

        <div className={css.formGroup}>
          <label htmlFor={`${fieldId}-tag`}>Tag</label>
          <Field
            as="select"
            id={`${fieldId}-tag`}
            name="tag"
            className={css.select}
          >
            <option value="Todo">Todo</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Meeting">Meeting</option>
            <option value="Shopping">Shopping</option>
          </Field>
          <ErrorMessage component="span" name="tag" className={css.error} />
        </div>

        <div className={css.actions}>
          <button
            onClick={handleCancel}
            type="button"
            className={css.cancelButton}
          >
            Cancel
          </button>
          <button type="submit" className={css.submitButton} disabled={false}>
            Create note
          </button>
        </div>
      </Form>
    </Formik>
  );
}
