type MetaProps = {
    title: string;
};

export const Meta = ({ title }: MetaProps) => {
    return <title>{`${title} // Halcyon`}</title>;
};
