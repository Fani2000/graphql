export default {
  Query: {
    products: (parent) => parent.products,
    productsByPrice: (parent, args, context, _) => {
      return parent.products.filter(
        (p) => p.price >= args.minPrice && p.price <= args.maxPrice
      );
    },
    productById: (parent, args, _) => {
      const product = parent.products.filter((p) => p.id === args.id);
      if (product.length < 1) {
        return [];
      }
      console.log(product[0], args.id);
      return product[0];
    },
  },

  Mutation: {
    addProduct: (parent, args, contenxt, _) => {
      const product = {
        id: args.id,
        description: args.description,
        price: args.price,
        reviews: [],
      };

      parent.products.push(product);

      return product;
    },
    addNewProductReview: (parent, args, _) => {
      const review = {
        rating: args.rating,
        comment: args.comment,
      };

      const product = parent.products.filter((p) => p.id === args.id)[0];

      product.reviews.push(review);

      return product;
    },
  },
};
