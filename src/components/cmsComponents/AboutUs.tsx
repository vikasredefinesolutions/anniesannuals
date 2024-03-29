interface _dataType {
  type: string;
  value: String;
}

interface AboutUsProps {
  data: _dataType;
}

function AboutUs({ data }: AboutUsProps) {
  return <div dangerouslySetInnerHTML={{ __html: data.value || '' }}></div>;
}

export default AboutUs;
