interface Props{
    index: [any]
}
const Icon = (props: any) => {
    const { iconName, ...rest} = props;
    return <i className={iconName} {...rest}></i>;
};

export default Icon;