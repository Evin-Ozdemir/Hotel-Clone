import { type FC } from "react";
import Container from "./container";
import Error from "../../components/header/error";
import { useParams } from "react-router-dom";
import { usePlace } from "../../utils/service";
import Loader from "../../components/loader/index";
import Images from "./images";
import Info from "./info";
import Overview from "./overview";
import Button from "./button";

const Detail: FC = () => {
  const { id } = useParams();
  const { isLoading, error, data, refetch } = usePlace(id as string);

  if (isLoading)
    return (
      <Container>
        <Loader />
      </Container>
    );

  if (error)
    return (
      <Container>
        <Error message={error.message} onRetry={refetch} />
      </Container>
    );

  if (!data) return;

  return (
    <Container>
      <Images image={data.image_url} />
      <Info place={data} />
      <Overview place={data} />
      <Button id={data.id} />
    </Container>
  );
};

export default Detail;
