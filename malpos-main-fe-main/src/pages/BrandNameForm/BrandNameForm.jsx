import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { Box, Button, FormGeneric } from "../../components/elements";
import IconField from "../../components/fields/IconField";
import { HandleNotification } from "../../components/elements/Alert";
import data from "../../data/formData/brandNameForm.json";
import api from "../../api/baseUrl";

const BrandNameForm = () => {
  const useFormReturn = useForm();
  const navigate = useNavigate();
  const handleLogin = async (data) => {
    try {
      const response = await api.post("brands/login", data);

      console.log(response);
      if (response.data) {
        navigate("/pin-pad");
      }
    } catch (error) {
      HandleNotification("Incorrect Password or Brand Name", false);
    }
  };
  return (
    <Box className="mc-auth text-center">
      <Box className="mc-auth-group shadow mt-2" style={{ borderRadius: 20 }}>
        <img src={"images/logo-malpos.png"} className="img-fluid" />
        <FormGeneric
          className="custom-form-css mc-auth-form"
          useFormReturn={useFormReturn}
          onSubmit={handleLogin}
        >
          {data?.input.map((item, index) => (
            <IconField
              key={index}
              icon={item.icon}
              type={item.type}
              name={item.name}
              option={item.option}
              classes={item.fieldSize}
              placeholder={item.placeholder}
            />
          ))}
          <Button
            className={`mc-auth-btn ${data?.button.fieldSize}`}
            type={data?.button.type}
          >
            {data?.button.text}
          </Button>
        </FormGeneric>
      </Box>
    </Box>
  );
};

export default BrandNameForm;
