import Link from 'next/link';

type Props = {
  path: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  dataId?: string;
  name: string;
};
export default function HeaderItem(props: Props) {
  return (
    <Link href={props.path} data-test-id={props.dataId}>
      <div className="group flex flex-col justify-center items-center cursor-pointer text-[#FEFEFE]">
        <props.icon className="w-7 h-7 group-hover:animate-bounce" />
        <p className="text-[#5eeee7] opacity-0 transition-opacity duration-700 group-hover:opacity-100 font-bold tracking-wider">
          {props.name}
        </p>
      </div>
    </Link>
  );
}