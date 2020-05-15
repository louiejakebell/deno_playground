interface Cat {
  name: string;
  age: number;
}

let cats: Array<Cat> = [
  {
    name: "simba",
    age: 2,
  },
  {
    name: "jimmy",
    age: 2,
  },
];

export const getCats = ({ response }: { response: any }) => {
  response.body = cats;
};

export const getCat = ({
  params,
  response,
}: {
  params: {
    name: string;
  };
  response: any;
}) => {
  const cat = cats.filter((cat) => cat.name === params.name);
  if (cat.length) {
    response.status = 200;
    response.body = cat[0];
    return;
  }

  response.status = 400;
  response.body = { msg: `cannot find cat ${params.name}` };
};

export const addCat = async ({
  request,
  response,
}: {
  request: any;
  response: any;
}) => {
  const body = await request.body();
  const cat: Cat = body.value;
  cats.push(cat);

  response.body = { msg: "ok" };
  response.status = 200;
};

export const updateCat = async ({
  params,
  request,
  response,
}: {
  params: {
    name: string;
  };
  request: any;
  response: any;
}) => {
  const temp = cats.filter((existingCat) => existingCat.name === params.name);
  const body = await request.body();
  const { age }: { age: number } = body.value;

  if (temp.length) {
    temp[0].age = age;
    response.status = 200;
    response.body = { msg: "ok" };
    return;
  }

  response.status = 400;
  response.body = { msg: `cannot find cat ${params.name}` };
};

export const removeCat = ({
  params,
  response,
}: {
  params: {
    name: string;
  };
  response: any;
}) => {
  const lengthBefore = cats.length;
  cats = cats.filter((cat) => cat.name !== params.name);

  if (cats.length === lengthBefore) {
    response.status = 400;
    response.body = { msg: `cannot find cat ${params.name}` };
    return;
  }

  response.body = { msg: "ok" };
  response.status = 200;
};
