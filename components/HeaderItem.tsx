import Link from 'next/link';

type Props = {
  path: string;
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  dataId?: string;
  name: string;
};
export default function HeaderItem(props: Props) {
  return (
    <div data-test-id={props.dataId}>
      <Link href={props.path}>
        <div className="group flex flex-col justify-center items-center cursor-pointer text-[#FEFEFE]">
          {props.icon && (
            <props.icon className="w-7 h-7 group-hover:animate-bounce" />
          )}
          <p
            className={`text-[#5eeee7] ${
              !props.icon ? `opacity-100` : `opacity-0`
            } transition-opacity duration-700 group-hover:opacity-100 font-bold tracking-wider`}
          >
            {props.name}
          </p>
        </div>
      </Link>
    </div>
  );
}
