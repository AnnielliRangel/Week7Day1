import { Schema, model } from "mongoose";

const processoSchema = new Schema(
  {
    documentName: {
      type: String,
      required: true,
      trim: true,
      minLength: 2,
      maxLength: 20,
      lowercase: true,
    },
    status: {
      type: String,
      required: true,
      trim: true,
      default: "Em Andamento",
    },
    details: {
      type: String,
      required: true,
      trim: true,
    },
    dateInit: {
      type: Date,
      required: true,
    },
    comments: [
      {
        type: String,
        trim: true,
      },
    ],

    dateEnd: {
      type: Date,
      required: true,
    },
    setor: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const ProcessoModel = model("Processo", processoSchema);

export default ProcessoModel;
